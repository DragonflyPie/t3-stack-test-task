import UserMovies from "./userMovies";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

const WatchedViewPage = () => {
  /*   const session = await getSession();
  if (!session) {
    return redirect("/");
  } */
  return (
    <div className="flex w-full flex-col items-center gap-4 pb-6 pt-20">
      <h1 className="text-3xl text-white">My Movies</h1>
      <UserMovies />
    </div>
  );
};

export default WatchedViewPage;
