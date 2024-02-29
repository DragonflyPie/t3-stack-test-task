import { unstable_noStore as noStore } from "next/cache";

import SearchForm from "./searchForm";
import Movies from "./movies";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 ">
      <SearchForm />
      <Movies />
    </main>
  );
}
