import { ViewAllParams } from "../types";

type ViewAllProps = {
  param: ViewAllParams;
};

export function ViewAll({ param }: ViewAllProps) {
  return (
    <div>
      <strong className="uppercase text-2xl">VIEW ALL - {param}</strong>
    </div>
  );
}
