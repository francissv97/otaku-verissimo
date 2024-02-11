import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { CaretLeft } from "@phosphor-icons/react";

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user)
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4 pt-20">
        <div className="fixed left-0 right-0 top-0 z-20 w-full">
          <div className="mx-auto w-full max-w-5xl">
            <div
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
              onClick={() => navigate(-1)}
            >
              <CaretLeft size={24} className="text-white" />
            </div>
          </div>
        </div>

        {user && (
          <>
            <img className="w-20" src={user.avatar.medium} alt="" />

            <strong className="text-xl font-medium text-main invert">
              {user.name}
            </strong>

            <button className="rounded bg-red-600 p-1 transition hover:bg-red-500">
              Sign Out
            </button>
          </>
        )}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-28">
      <strong className="text-xl">Parece que você não está logado</strong>

      <Link to="/" className="w-fit rounded bg-main p-1">
        Voltar para a home
      </Link>
    </div>
  );
}
