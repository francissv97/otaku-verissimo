import { useNavigate } from "react-router-dom";
import { ViewAllParams } from "../types";

type HeaderResultProps = {
  title: string;
  paramViewAll?: ViewAllParams;
};

export function HeaderResults({ title, paramViewAll }: HeaderResultProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between max-w-5xl mx-auto px-2">
      <strong className="my-2 text-zinc-500 text-md font-main font-semibold uppercase">
        {title}
      </strong>

      <button
        onClick={() => navigate(`/${paramViewAll}`)}
        className="uppercase text-zinc-500 h-fit my-auto text-xs hover:text-zinc-600 font-semibold duration-100"
      >
        view all
      </button>
    </div>
  );
}
