"use client";

import React, { useState } from "react";
import Button from "./_components/commons/button";
import { api } from "~/trpc/react";
import Spinner from "./_components/commons/spinner";
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const [currentQuery, setCurrentQuery] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("?" + createQueryString("q", currentQuery));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(e.target.value);
  };

  const { isFetching } = api.movie.getMovies.useInfiniteQuery(
    {
      queryString: query,
    },
    {
      enabled: !!query,
      initialCursor: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return (
    <div className="fixed z-10 mt-16 flex h-16 w-[110%] items-center justify-center bg-blumine shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          id="query"
          className="rounded-sm px-2 py-1"
          value={currentQuery}
          onChange={handleChange}
        />
        <Button
          value={isFetching ? <Spinner size="small" /> : "Find"}
          type="submit"
          disabled={isFetching || !currentQuery}
        />
      </form>
    </div>
  );
};

export default SearchForm;
