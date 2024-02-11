import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { SignIn, HouseSimple } from "@phosphor-icons/react";
import logo from "@/assets/logo.svg";

function UnauthenticatedView() {
  const aniListAuthUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${import.meta.env.VITE_ID_CLIENT}&response_type=token`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-2">
      <div className="flex flex-1 flex-col items-center justify-center">
        <Link to="/">
          <img
            src={logo}
            alt="otakuVERISSIMO"
            className="w-40 cursor-pointer self-center"
          />
        </Link>

        <div className="flex flex-col items-center justify-center py-4">
          <span className="text-2xl">Log in with AniList to access.</span>
          <span className="text-2xl">Log in with your AniList account.</span>
        </div>

        <a
          href={aniListAuthUrl}
          title="Sign in with AniList"
          className="flex h-full cursor-pointer items-center justify-center rounded bg-gradient-to-r from-sky-600 via-cyan-500 to-cyan-300 p-2 transition"
        >
          <SignIn size={40} className="text-black" />
          <span className="min-w-max p-1 text-center text-xl text-black">
            Log in with AniList
          </span>
        </a>

        <Link
          to="/"
          className="mx-auto mt-4 flex w-fit items-center justify-center gap-2 rounded-lg p-2 text-xl text-main transition hover:bg-main/10 hover:text-main"
        >
          <span className="text-zinc-200">or</span> back to home
          <HouseSimple weight="duotone" size={24} />
        </Link>
      </div>
    </div>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) return <UnauthenticatedView />;

  return children;
}
