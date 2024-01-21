import { Link, useNavigate } from "react-router-dom";
import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import logo from "@/assets/logo.svg";

interface HeaderProps {
  hideBackButton?: boolean;
  hideSearchButton?: boolean;
}

export function Header({ hideBackButton, hideSearchButton }: HeaderProps) {
  const navigate = useNavigate();

  function handleGoBack() {
    if (window.history.state && window.history.state.idx > 0) {
      return navigate(-1);
    }

    navigate("/");
  }

  function handleGoSearchPage() {
    navigate("/search");
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-30 h-20 bg-black duration-300 sm:block">
      <div className="group mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center">
          {!hideBackButton && (
            <div
              title="return to previous page"
              className="cursor-pointer rounded-lg p-4 transition hover:bg-main/10"
              onClick={handleGoBack}
            >
              <CaretLeft size={24} className="text-main" />
            </div>
          )}

          <Link to="/">
            <img src={logo} alt="otakuVERISSIMOlogo" className="my-auto w-24 cursor-pointer" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!hideSearchButton ? (
            <div
              title="go to search page"
              className="rotate-90 cursor-pointer rounded-lg p-4 transition hover:bg-main/10"
              onClick={handleGoSearchPage}
            >
              <MagnifyingGlass size={24} className="text-main" />
            </div>
          ) : (
            <div className="w-14" />
          )}
        </div>
      </div>
    </div>
  );
}
