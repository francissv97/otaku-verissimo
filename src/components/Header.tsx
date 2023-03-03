import { useNavigate } from "react-router-dom";
import { ViewAllParams } from "../types";
import logo from "../assets/logo.svg";

type HeaderResultProps = {
  title: string;
  paramViewAll?: ViewAllParams;
};

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

export function HeaderResults({ title, paramViewAll }: HeaderResultProps) {
  const navigate = useNavigate();

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
