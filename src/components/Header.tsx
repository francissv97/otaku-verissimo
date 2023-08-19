import { Link, useLocation, useNavigate } from "react-router-dom";
import { ViewAllParams } from "../types";
import { CaretLeft } from "phosphor-react";
import logo from "../assets/logo.svg";

export function Header() {
  return (
    <header>
      <div className="mx-auto max-w-screen-lg px-4 pt-4">
        <img src={logo} alt="otakuVERISSIMOLogo" className="mx-auto w-44 md:w-60" />
      </div>
    </header>
  );
}

type HeaderResultProps = {
  title: string;
  paramViewAll?: ViewAllParams;
};

export function HeaderResults({ title, paramViewAll }: HeaderResultProps) {
  return (
    <div className="mx-auto my-2 flex max-w-6xl items-center justify-between">
      <strong className="text-base font-medium uppercase text-main">{title}</strong>

      {/* <button
        onClick={() => navigate(`/${paramViewAll}`)}
        className="uppercase h-fit text-xs hover:text-zinc-600 font-medium duration-100"
      >
        view all
      </button> */}
    </div>
  );
}

export function SimpleHeader() {
  const navigate = useNavigate();

  function handleGoBack() {
    if (window.history.state && window.history.state.idx > 0) {
      return navigate(-1);
    }

    navigate("/");
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-30 h-10 bg-zinc-900/60 backdrop-blur-sm duration-300 sm:block md:h-11">
      <div className="group mx-auto flex w-full max-w-6xl items-center justify-between px-4">
        <div className="cursor-pointer p-2 transition hover:bg-main/10" onClick={handleGoBack}>
          <CaretLeft size={22} className="text-main" />
        </div>

        <Link to="/" className="flex flex-1 justify-center">
          <img
            src={logo}
            alt="otakuVERISSIMOlogo"
            className="my-auto w-48 cursor-pointer px-2 md:w-60"
          />
        </Link>
      </div>
    </div>
  );
}
