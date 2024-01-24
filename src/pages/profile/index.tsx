import { Link, useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user)
    return (
      <div className="flex flex-col p-4 gap-4 items-center justify-center pt-20">
        <div className="fixed top-0 left-0 right-0 z-20 w-full">
          <div className="max-w-6xl w-full mx-auto">
            <div
              className="w-16 cursor-pointer h-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full"
              onClick={() => navigate(-1)}
            >
              <CaretLeft size={24} className="text-white" />
            </div>
          </div>
        </div>

        {user && (
          <>
            <img className="w-20" src={user.avatar.medium} alt="" />

            <strong className="font-medium text-main invert text-xl">{user.name}</strong>

            <button className="bg-red-600 p-1 hover:bg-red-500 transition rounded">Sign Out</button>
          </>
        )}
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-4 justify-center pt-28">
      <strong className="text-xl">Parece que você não está logado</strong>
      
      <Link to="/" className="bg-main w-fit p-1 rounded">
        Voltar para a home
      </Link>
    </div>
  );
}
