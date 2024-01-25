import { useAuth } from "@/hooks/useAuth";
import { HouseSimple, SignIn, Video } from "@phosphor-icons/react";

export function MenuBottom() {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 h-20 bg-black duration-300 sm:block md:hidden md:h-28">
      <div className="group mx-auto flex h-full w-full max-w-6xl items-center justify-center gap-4 px-4">
        <div
          title="Home"
          className="deco flex h-20 w-20 cursor-pointer flex-col items-center justify-center p-2 md:h-28 md:w-28"
        >
          <HouseSimple size={32} />
          <span>Home</span>
        </div>

        {user && (
          <div
            title="Anime List"
            className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center p-2 md:h-28 md:w-28"
          >
            <Video size={32} />
            <span>Anime</span>
          </div>
        )}

        {!user ? (
          <div
            title="Sign in with AniList"
            className="flex h-20 cursor-pointer items-center justify-center bg-gradient-to-r from-sky-600 via-cyan-500 to-cyan-300 p-2 transition md:h-28 md:w-28"
          >
            <SignIn size={32} className="text-black" />
            <strong className="min-w-max p-1 text-center font-medium text-black">
              Log in with AniList
            </strong>
          </div>
        ) : (
          <div
            title="Anime List"
            className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center p-2 md:h-28 md:w-28"
          >
            <img
              src={user.avatar.medium}
              alt="avatar image user"
              className="w-8"
            />
            <span>Perfil</span>
          </div>
        )}
      </div>
    </div>
  );
}
