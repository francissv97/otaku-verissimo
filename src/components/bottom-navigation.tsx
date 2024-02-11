import { Link } from "react-router-dom";
import { HouseSimple, SignIn, Video } from "@phosphor-icons/react";
import { useAuth } from "@/hooks/use-auth";

type TBottomNavigationProps = {
  active: "/" | "animeList";
};

export function BottomNavigation({ active }: TBottomNavigationProps) {
  const { user } = useAuth();

  const currentRoute = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 h-14 bg-black duration-300 sm:block md:hidden md:h-28">
      <div className="group mx-auto flex h-full w-full max-w-5xl items-center justify-center px-4">
        <div
          title="Home"
          className="flex h-14 cursor-pointer items-center justify-center gap-1 p-2"
        >
          <HouseSimple size={24} />
          <span className="text-sm">Home</span>
        </div>

        {user && (
          <Link
            to="/animelist"
            title="My Anime List"
            className="flex h-14 cursor-pointer items-center justify-center gap-1 p-2"
          >
            <Video size={24} />
            <span className="text-sm">Anime List</span>
          </Link>
        )}

        {user === null && (
          <a
            href={`https://anilist.co/api/v2/oauth/authorize?client_id=${import.meta.env.VITE_ID_CLIENT}&response_type=token`}
            title="Sign in with AniList"
            className="flex h-full cursor-pointer items-center justify-center bg-second px-2 transition"
          >
            <SignIn size={32} className="text-black" />
            <span className="text-center text-black">Log in with AniList</span>
          </a>
        )}

        {user && (
          <Link
            to="/profile"
            title="Anime List"
            className="flex h-14 w-20 cursor-pointer flex-col items-center justify-center p-2 md:h-28 md:w-28"
          >
            <img
              src={user.avatar.medium}
              alt="avatar image user"
              className="w-6"
            />
            <span className="text-xs">Perfil</span>
          </Link>
        )}
      </div>
    </div>
  );
}
