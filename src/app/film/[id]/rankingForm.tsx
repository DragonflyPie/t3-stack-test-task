import React from "react";
import Button from "../../_components/commons/button";
import StarsRadio from "./starsRadio";
import Spinner from "../../_components/commons/spinner";

interface RankingFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  rating: number | null;
  isLoading: boolean;
  changeRating: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ranked: boolean;
}

const RankingForm = ({
  handleSubmit,
  rating,
  changeRating,
  isLoading,
  ranked,
}: RankingFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center justify-center bg-stone-500 p-10"
    >
      <div className=""></div>
      <div className="flex gap-5">
        <div className="flex gap-2">
          <div className="">My ranking: </div>
          <StarsRadio rating={rating} handleChangeRating={changeRating} />
        </div>
        <Button
          type="submit"
          value={
            isLoading ? (
              <Spinner size="small" />
            ) : ranked ? (
              "Change rating"
            ) : (
              "Add to watched"
            )
          }
          disabled={isLoading || !rating}
        />
      </div>
    </form>
  );
};

export default RankingForm;
