import { MovieWithUserRating } from "~/server/api/routers/moviesRouter";
import Card from "../_components/commons/card";
import { useMemo } from "react";

interface CardsGridProps {
  movies: MovieWithUserRating[];
}
const CardsGrid = ({ movies }: CardsGridProps) => {
  const sortedMovies = useMemo(() => {
    return [...movies].sort(
      (a, b) => b.ranking![0]!.rating - a.ranking![0]!.rating,
    );
  }, [movies]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {sortedMovies.map((movie) => {
        return (
          <Card
            key={movie.imdbId}
            title={movie.title}
            year={movie.year}
            imdbId={movie.imdbId}
            poster={movie.poster}
            ranking={movie.ranking}
          />
        );
      })}
    </div>
  );
};

export default CardsGrid;
