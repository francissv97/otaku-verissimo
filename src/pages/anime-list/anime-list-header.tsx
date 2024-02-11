import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, HouseLine } from "@phosphor-icons/react";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo-inline.svg";

export function AnimeListHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleGoBack() {
    if (window.history.state && window.history.state.idx > 0) {
      return navigate(-1);
    }

    navigate("/");
  }

  useEffect(() => {
    let lastScrollTop = 0;

    function handleScroll() {
      const navbar = document.getElementById("navbar");
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (navbar) {
        if (scrollTop > lastScrollTop) {
          navbar.style.top = "-56px";
        } else {
          navbar.style.top = "0px";
        }
      }

      lastScrollTop = scrollTop;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="navbar"
      className="fixed left-0 right-0 top-0 z-30 h-14 bg-black duration-300 sm:block"
    >
      <div className="group mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-medium text-main">Anime List</span>

          <div
            title="home page"
            className="hidden cursor-pointer items-center justify-center gap-1 bg-white/20 p-4 transition hover:bg-white/30 md:flex"
            onClick={handleGoBack}
          >
            <HouseLine size={20} className="text-zinc-300" />
            <span className="text-zinc-300">Home</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-14 w-14 cursor-pointer items-center justify-center hover:bg-white/10">
            <MagnifyingGlass
              size={24}
              weight="bold"
              className="text-zinc-400"
            />
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
    </div>
  );
}
