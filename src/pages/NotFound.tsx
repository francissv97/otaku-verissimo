import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import logo from "../assets/logo.svg";
import notFound from "../assets/404.svg";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center items-center px-2 relative">
      <div className="flex flex-1 flex-col justify-center">
        <img src={logo} alt="97AnimeListLogo" className="w-40 self-center" />
        <img src={notFound} alt="" className="w-96 mx-auto" />

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 p-2 text-xl text-zinc-600 border-2 rounded w-fit mx-auto transition border-zinc-600 hover:border-main hover:text-main"
        >
          <ArrowLeft size={32} />
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
