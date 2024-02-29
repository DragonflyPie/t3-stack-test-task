"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed z-20 flex h-16 w-screen  justify-end gap-6 bg-stone-800 px-4 py-4  text-stone-100 md:pr-8">
      <div className="mr-auto flex gap-4 underline-offset-2 ">
        <Link className="hover:text-stone-300 hover:underline" href={"/"}>
          Home
        </Link>
        {session && (
          <Link
            className="hover:text-stone-300 hover:underline "
            href={"/watched"}
          >
            My Movies
          </Link>
        )}
      </div>
      {session && (
        <div className="flex items-center gap-4">
          <div className="hidden md:block">{session.user.email}</div>
          <div className="h-8 w-8 overflow-hidden rounded-full border border-black bg-slate-300">
            {session.user.image ? (
              <Image src={session.user.image} alt="" height={32} width={32} />
            ) : session.user.name ? (
              session.user.name?.slice(1, 0)
            ) : (
              "G"
            )}
          </div>
        </div>
      )}

      {session ? (
        <button
          className="underline-offset-2 transition-all hover:text-stone-300 hover:underline"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
};

export default Navbar;
