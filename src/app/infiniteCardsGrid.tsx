import React from "react";
import { Movie } from "~/server/api/routers/moviesRouter";
import Card from "./_components/commons/card";
import { InfiniteData } from "@tanstack/react-query";

interface InfiniteCardsGridProps {
  data: InfiniteData<{
    movies: Movie[];
    nextCursor: number | null;
  }>;
}

const InfiniteCardsGrid = ({ data }: InfiniteCardsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.movies.map((movie: Movie, j: number) => {
            console.log({ length: group.movies.length, j });
            if (group.movies.length === j + 1) {
              return <Card key={movie.imdbId} {...movie} />;
            }
            return <Card key={movie.imdbId} {...movie} />;
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default InfiniteCardsGrid;
