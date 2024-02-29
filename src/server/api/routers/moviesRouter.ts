import axios, { AxiosResponse } from "axios";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { validateUrl } from "~/utils/validateUrl";
import { env } from "~/env";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { movies, rankings } from "~/server/db/schema";

const MovieValidator = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Director: z.string().optional(),
  Year: z.string(),
  Runtime: z.string().optional(),
  Poster: z.string().optional(),
  Plot: z.string().optional(),
  Ratings: z
    .array(
      z.object({
        Source: z.string(),
        Value: z.string(),
      }),
    )
    .optional(),
});

const RankingValidator = MovieValidator.extend({
  rating: z.number(),
});

export type OmdbMovie = z.infer<typeof MovieValidator>;

export interface Movie {
  title: string;
  year: string | null;
  imdbId: string;
  poster?: string | null;
  plot?: string | null;
  runtime?: string | null;
  director?: string | null;
}

export interface MovieWithUserRating extends Movie {
  ranking?: {
    rating: number;
  }[];
}

interface omdbResponse {
  Search?: OmdbMovie[];
  Response: string;
  totalResults?: string;
  Error?: string;
}

interface omdbByID extends OmdbMovie {
  Response: string;
  Error?: string;
}

export const moviesRouter = createTRPCRouter({
  getMovies: publicProcedure
    .input(
      z.object({
        queryString: z.string().nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { queryString, cursor } = input;

      const fetchMovies: AxiosResponse<omdbResponse> = await axios.get(
        `https://www.omdbapi.com/?apikey=${env.OMDB_API_KEY}&s=${queryString}&page=${cursor}`,
      );
      const { Search } = fetchMovies.data;

      const movies = !Search
        ? []
        : Search.map((movie) => {
            return {
              title: movie.Title,
              year: movie.Year,
              imdbId: movie.imdbID,
              poster: validateUrl(movie.Poster) ? movie.Poster : "",
            } as Movie;
          });

      const nextCursor = cursor ? cursor + 1 : null;

      return { movies, nextCursor };
    }),

  getMovieById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      const fetchMovieById: AxiosResponse<omdbByID> = await axios.get(
        `https://www.omdbapi.com/?apikey=${env.OMDB_API_KEY}&i=${id}`,
      );

      const data = fetchMovieById.data;

      if (data.Error) {
        throw new Error("Something went wrong");
      }

      return data;
    }),

  getRankingById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      const currentRanking = await ctx.db.query.rankings.findFirst({
        columns: {
          rating: true,
        },
        where: and(
          eq(rankings.rankedBy, ctx.session.user.id),
          eq(rankings.rankedMovie, id),
        ),
      });

      return currentRanking;
    }),

  rankMovie: protectedProcedure
    .input(RankingValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(movies)
        .values({
          imdbId: input.imdbID,
          director: input.Director,
          title: input.Title,
          year: input.Year,
          runtime: input.Runtime,
          poster: input.Poster,
        })
        .onConflictDoNothing();

      await ctx.db
        .insert(rankings)
        .values({
          rankedBy: ctx.session.user.id,
          rankedMovie: input.imdbID,
          rating: input.rating,
        })
        .onConflictDoUpdate({
          target: [rankings.rankedBy, rankings.rankedMovie],
          set: { rating: input.rating },
        });
    }),

  getUserMovies: protectedProcedure.query(async ({ ctx }) => {
    const movies: MovieWithUserRating[] = await ctx.db.query.movies.findMany({
      with: {
        ranking: {
          where: eq(rankings.rankedBy, ctx.session.user.id),
          columns: {
            rating: true,
          },
        },
      },
    });

    return { movies };
  }),
});
