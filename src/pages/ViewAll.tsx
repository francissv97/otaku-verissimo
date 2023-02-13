import { ViewAllParams } from "../types";

type ViewAllProps = {
  param: ViewAllParams;
};

export function ViewAll({ param }: ViewAllProps) {
  return (
    <div className="flex flex-col p-10">
      <strong className="uppercase text-lg">VIEW ALL - {param}</strong>

      <strong className="text-2xl">
        {"<"} under development... {" />"}
      </strong>
    </div>
  );
}
