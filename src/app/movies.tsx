"use client";

import React, { useEffect } from "react";
import { api } from "~/trpc/react";
import { useInView } from "react-intersection-observer";
import InfiniteCardsGrid from "./infiniteCardsGrid";
import Container from "./_components/commons/container";
import Spinner from "./_components/commons/spinner";
import { useSearchParams } from "next/navigation";

const Movies = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { ref, inView } = useInView({ rootMargin: "100px" });

  const {
    isFetching,
    isLoading,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.movie.getMovies.useInfiniteQuery(
    {
      queryString: query,
    },
    {
      enabled: !!query,
      initialCursor: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (!query) {
    return null;
  }

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

  if (!data.pages[0]?.movies.length) {
    return (
      <Container>
        <div>No movies found</div>
      </Container>
    );
  }

  return (
    <div className=" flex w-full flex-col items-center pb-6 pt-40">
      <InfiniteCardsGrid data={data} />
      <div className="" ref={ref}></div>
      {isFetchingNextPage && (
        <Container>
          <Spinner />
        </Container>
      )}
    </div>
  );
};

export default Movies;
