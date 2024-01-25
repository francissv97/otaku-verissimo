import { useNavigate } from "react-router-dom";
import {
  CaretLeft,
  MagnifyingGlass,
  SignIn,
  Video,
} from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo-inline.svg";

export function AnimeHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleGoBack() {
    if (window.history.state && window.history.state.idx > 0) {
      return navigate(-1);
    }

    navigate("/");
  }

  function handleLoginWithAniList() {
    const popUp = window.open(
      `https://anilist.co/api/v2/oauth/authorize?client_id=${import.meta.env.VITE_ID_CLIENT}&response_type=token`,
      "AniListAuth",
      "width=500,height=600",
    );

    window.addEventListener("message", (event) => {
      console.log("evento message recebido");

      if (event.origin === "https://otakuverissimo.com") {
        const tokenMatch = event.data.match(/access_token=([^&]+)/);
        const token = tokenMatch ? tokenMatch[1] : null;

        console.log("Token recebido:", token);

        popUp?.close();

        if (token) {
          localStorage.setItem("access_token", token);
        }
      }
    });
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-20 w-full">
      <div className="mx-auto w-full max-w-6xl p-4">
        <div
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          onClick={handleGoBack}
        >
          <CaretLeft size={24} className="text-white" />
        </div>

        {user && (
          <div
            title={user.name}
            className="hidden h-14 w-14 cursor-pointer items-center justify-center rounded-lg transition hover:bg-main/10 md:flex"
            onClick={() => navigate("/profile")}
          >
            <img src={user.avatar.medium} className="w-8" />
          </div>
        )}
      </div>
    </div>
    // <div className="fixed left-0 right-0 top-0 z-30 h-14 bg-black duration-300 sm:block">
    //   <div className="group mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4">
    //     <div className="flex items-center">
    //       {!hideBackButton ? (
    //         <div
    //           title="return to previous page"
    //           className="cursor-pointer rounded-lg p-4 transition hover:bg-main/10"
    //           onClick={handleGoBack}
    //         >
    //           <CaretLeft size={24} className="text-zinc-400" />
    //         </div>
    //       ) : (
    //         <img
    //           src={logo}
    //           alt="otakuVERISSIMOlogo"
    //           className="my-auto w-44 cursor-pointer"
    //         />
    //       )}
    //     </div>

    //     {location.href.includes("localhost") && (
    //       <button
    //         className="flex h-full flex-col items-center justify-center truncate bg-pink-400/30 px-2 text-pink-500"
    //         onClick={handleLoginWithAniList}
    //       >
    //         Log in with AniList
    //         <span>{`window.open (event: message)`}</span>
    //       </button>
    //     )}

    //     {user && (
    //       <div
    //         title="go to anime list page"
    //         className="hidden h-full cursor-pointer items-center justify-center gap-2 bg-zinc-700 p-2 hover:bg-zinc-600 md:flex"
    //         // onClick={() => navigate("/search")}
    //       >
    //         <Video size={32} className="w-full text-zinc-300" />
    //         <span className="flex min-w-max text-zinc-300">Anime List</span>
    //       </div>
    //     )}

    //     {!user && (
    //       <div
    //         title="Sign in with AniList"
    //         className="hidden h-full cursor-pointer items-center justify-center bg-gradient-to-r from-sky-600 via-cyan-500 to-cyan-300 p-2 transition md:flex"
    //       >
    //         <SignIn size={32} className="text-black" />
    //         <strong className="min-w-max p-1 text-center font-medium text-black">
    //           Log in with AniList
    //         </strong>
    //       </div>
    //     )}

    //     <div className="flex items-center gap-2">
    //       {!hideSearchButton ? (
    //         <div
    //           title="go to search page"
    //           className="flex h-14 w-14 cursor-pointer items-center justify-center hover:bg-zinc-900"
    //           onClick={() => navigate("/search")}
    //         >
    //           <MagnifyingGlass
    //             size={24}
    //             weight="bold"
    //             className="text-zinc-400"
    //           />
    //         </div>
    //       ) : (
    //         <div className="w-14" />
    //       )}

    //       {user && (
    //         <div
    //           title={user.name}
    //           className="hidden h-14 w-14 cursor-pointer items-center justify-center rounded-lg transition hover:bg-main/10 md:flex"
    //           onClick={() => navigate("/profile")}
    //         >
    //           <img src={user.avatar.medium} className="w-8" />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
