import { useState } from "react";

interface StarsProps {
  rating: number | null;
  handleChangeRating: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarsRadio = ({ handleChangeRating, rating }: StarsProps) => {
  const [hover, setHover] = useState<number | null>(null);
  const TOTAL_STARS = 10;
  return (
    <div className="flex gap-3 ">
      {[...Array(TOTAL_STARS)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              className="hidden"
              value={currentRating}
              onChange={(e) => handleChangeRating(e)}
            />
            <span
              className={`cursor-pointer text-xl
             ${currentRating <= (hover || rating || 0) ? "text-goldStar" : "text-grayStar"} 
              `}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarsRadio;
