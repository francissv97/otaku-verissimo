import { Link, useLocation, useNavigate } from "react-router-dom";
import { ViewAllParams } from "../types";
import { CaretLeft } from "phosphor-react";
import logo from "../assets/logo.svg";

export function Header() {
  return (
    <header className="bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-800">
      <div className="max-w-screen-lg mx-auto p-4">
        <img
          src={logo}
          alt="otakuVERISSIMOLogo"
          className="w-44 md:w-60 mx-auto"
        />
      </div>
    </header>
  );
}

type HeaderResultProps = {
  title: string;
  paramViewAll?: ViewAllParams;
};

export function HeaderResults({ title, paramViewAll }: HeaderResultProps) {
  // const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto my-2">
      <strong className="text-zinc-500 text-lg font-medium uppercase">
        {title}
      </strong>

      {/* <button
        onClick={() => navigate(`/${paramViewAll}`)}
        className="uppercase text-zinc-500 h-fit text-xs hover:text-zinc-600 font-medium duration-100"
      >
        view all
      </button> */}
    </div>
  );
}

export function SimpleHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleGoBack() {
    const arrayRoutes: string[] = location.state.from;

    if (arrayRoutes.length > 0 && arrayRoutes[arrayRoutes.length - 1] !== "/") {
      const navFor = arrayRoutes.pop() as string;

      return navigate(navFor, {
        state: {
          from: arrayRoutes,
        },
      });
    }

    return navigate("/");
  }

  return (
    <div className="sm:block fixed z-30 bg-zinc-800/60 md:hover:bg-zinc-800 backdrop-blur-sm left-0 right-0 top-0 duration-300">
      <div className="group flex w-full justify-between items-center max-w-6xl mx-auto px-4">
        <div
          className="p-2 cursor-pointer transition hover:bg-main/10"
          onClick={handleGoBack}
        >
          <CaretLeft size={22} className="text-main" />
        </div>

        <Link to="/" className="flex flex-1 justify-center">
          <img
            src={logo}
            alt="otakuVERISSIMOlogo"
            className="w-48 md:w-60 my-auto px-2 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}
