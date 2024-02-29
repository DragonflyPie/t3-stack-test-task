interface StarsProps {
  rating?: number | null;
}

const Stars = ({ rating }: StarsProps) => {
  const TOTAL_STARS = 10;
  return (
    <div className="flex gap-2 ">
      {[...Array(TOTAL_STARS)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <span
            className={`cursor-default text-xl
             ${currentRating <= (rating || 0) ? "text-goldStar" : "text-gray-300"} 
              `}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Stars;
