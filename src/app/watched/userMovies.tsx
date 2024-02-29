"use client";

import { api } from "~/trpc/react";
import CardsGrid from "./cardsGrid";
import Spinner from "../_components/commons/spinner";
import Container from "../_components/commons/container";

const UserMovies = () => {
  const { isLoading, data, error } = api.movie.getUserMovies.useQuery();

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div>Error happened</div>
      </Container>
    );
  }

  if (!data.movies.length) {
    return (
      <Container>
        <div>No movies here yet. Rank a movie first.</div>
      </Container>
    );
  }

  return (
    <div className="">
      <CardsGrid movies={data.movies} />
    </div>
  );
};

export default UserMovies;
