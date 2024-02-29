import Image from "next/image";
import Link from "next/link";
import { MovieWithUserRating } from "~/server/api/routers/moviesRouter";
import Stars from "../../watched/stars";

const Card = ({
  title,
  poster,
  year,
  imdbId,
  ranking,
}: MovieWithUserRating) => {
  const cardContent = (
    <>
      <Link href={`/film/${imdbId}`}>
        <div className="relative aspect-[3/4.45] w-[300px]">
          <Image
            quality={100}
            src={poster ? poster : "no_image.svg"}
            alt={`Poster of ${title}`}
            fill={true}
            className="object-cover"
          />
        </div>
      </Link>
      <Link href={`/film/${imdbId}`}>
        <h2 className="px-2 py-1 text-center text-lg font-semibold">{title}</h2>
      </Link>
      <div className="absolute bottom-2">
        {ranking && ranking.length ? (
          <Stars rating={ranking[0]?.rating} />
        ) : (
          <p className="text-sm">Year: {year}</p>
        )}
      </div>
    </>
  );

  return (
    <div className="relative flex w-min flex-col items-center overflow-hidden rounded bg-stone-200 pb-8 ">
      {cardContent}
    </div>
  );
};

export default Card;
