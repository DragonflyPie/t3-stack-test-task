"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import RankingForm from "~/app/film/[id]/rankingForm";
import Spinner from "~/app/_components/commons/spinner";
import { api } from "~/trpc/react";

export default function MoviesViewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: session } = useSession();
  const { data, isLoading, error } = api.movie.getMovieById.useQuery({ id });
  const { data: rankingData } = api.movie.getRankingById.useQuery({ id });
  const { isLoading: isSubmitting, mutate } = api.movie.rankMovie.useMutation();
  const [rating, setRating] = useState<number | null>(null);
  const [isRanked, setIsRanked] = useState(false);

  useEffect(() => {
    if (!rankingData) return;
    setRating(rankingData.rating);
    setIsRanked(true);
  }, [rankingData]);

  const changeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(e.target.value));
  };

  const handlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !data) return;

    mutate({ ...data, rating });
    setIsRanked(true);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div className="">Something went wrong</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-between gap-4 overflow-hidden bg-stone-300 ">
      <div className="flex grow flex-col items-center justify-between gap-4 p-4 lg:p-20">
        <div className="flex w-full  flex-col items-center lg:flex-row lg:items-start lg:gap-10">
          <div className="relative  aspect-[3/4.45] w-[300px]">
            {data.Poster ? (
              <Image
                quality={100}
                src={data.Poster}
                alt={`Poster of ${data.Title}`}
                fill={true}
                className="object-cover"
              />
            ) : (
              <p className="py-10 text-center">No image</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">{data.Title}</h1>
            <div className="">Year: {data.Year}.</div>
            <div className="">Directors: {data.Director}.</div>
            <div className="">{data.Plot}</div>
            <div className="">Runtime: {data.Runtime}.</div>
          </div>
        </div>
        <div className="flex gap-5">
          {data.Ratings?.map((rating) => {
            return (
              <div className="">
                {rating.Source}:{" "}
                <span className="font-semibold">{rating.Value}</span>
              </div>
            );
          })}
        </div>
      </div>
      {session && (
        <RankingForm
          handleSubmit={handlSubmit}
          rating={rating}
          isLoading={isSubmitting}
          changeRating={changeRating}
          ranked={isRanked}
        />
      )}
    </div>
  );
}
