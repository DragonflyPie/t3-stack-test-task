import { createTRPCRouter } from "~/server/api/trpc";
import { moviesRouter } from "./routers/moviesRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  movie: moviesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
