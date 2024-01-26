import { CopySimple } from "@phosphor-icons/react";
import toast from "react-hot-toast";

type TitleCopyToClipboardProps = {
  title: string;
};

export function TitleCopyToClipboard({ title }: TitleCopyToClipboardProps) {
  function handleClick() {
    navigator.clipboard.writeText(title);
    toast("Text copied .:", { duration: 3000, position: "bottom-center" });
  }

  return (
    <div className=" flex flex-1 items-center gap-1">
      <span
        onClick={handleClick}
        className="relative cursor-pointer pr-4 text-justify text-sm text-second"
        title="click to copy"
      >
        {title}

        <CopySimple className="absolute -right-3 -top-1 h-6 w-6 cursor-pointer rounded-full bg-second/80 p-1 text-[20px] text-zinc-50 duration-500" />
      </span>
    </div>
  );
}
