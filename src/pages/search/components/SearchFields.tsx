import { ChangeEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import * as Select from "@radix-ui/react-select";
import { Check, CaretDown, CaretUp } from "phosphor-react";
import { genres } from "@/utils";

import { MagnifyingGlass, Tag, SlidersHorizontal, FunnelSimple, X } from "phosphor-react";

type SearchFields = {
  search: string;
  genres: string[];
  year: number;
  season: "WINTER" | "SUMMER" | "SPRING" | "FALL";
  format: "TV" | "MOVIE" | "TV_SHORT" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | "ONE_SHOT";
};

type InputSearchProps = {
  setSearchParams: (searchTerm: string | {}) => void;
  searchParams: URLSearchParams;
  searchTerm: string;
};

type SelectItemProps = {
  value: string;
  children: ReactNode;
};

export function InputSearch({ searchTerm, searchParams, setSearchParams }: InputSearchProps) {
  const [displayValue, setDisplayValue] = useState("");
  const debouncer = useCallback(debounce(setSearchParams, 700), []);

  function handleClear() {
    setDisplayValue("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setDisplayValue(event.target.value);

    if (event.target.value) {
      debouncer({ search: event.target.value });
    } else {
      debouncer.cancel();
      handleClear();
    }
  }

  useEffect(() => {
    if (searchTerm) setDisplayValue(searchTerm);
  }, []);

  return (
    <div className="flex w-full flex-col gap-2 md:max-w-xs">
      <span className="font-medium">Search</span>
      <div className="flex items-center gap-2 border-b-2 border-main px-2 shadow-xl">
        <MagnifyingGlass size={24} className="text-zinc-400" weight="bold" />

        <input
          type="text"
          onChange={handleSearch}
          value={displayValue}
          className="w-full bg-transparent p-2 text-lg leading-none text-zinc-300 caret-main/70 outline-none"
        />
        <button
          onClick={handleClear}
          disabled={displayValue.length <= 0}
          className={`group rounded-full p-1 duration-300 hover:bg-black ${
            displayValue ? "opacity-100" : "opacity-0"
          }`}
        >
          <X size={18} className="text-zinc-400 duration-200 group-hover:text-red-500" weight="bold" />
        </button>
      </div>
    </div>
  );
}

export function SelectFieldGenres() {
  return (
    <Select.Root>
      <Select.Trigger
        className="inline-flex h-9 min-w-[100px] items-center justify-between gap-1 rounded bg-zinc-50 px-4 text-sm leading-none text-main shadow-[0_2px_10px] shadow-black/10 outline-zinc-400 duration-200 hover:bg-zinc-200/50 hover:shadow-md data-[placeholder]:text-zinc-500"
        aria-label="Select"
      >
        <Select.Value placeholder="Any" />
        <Select.Icon className="text-zinc-500">
          <CaretDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="mt-1 overflow-hidden rounded-md bg-zinc-50 shadow-lg shadow-black/10"
        >
          <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-zinc-50 text-zinc-500">
            <CaretUp />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            <Select.Group>
              <Select.Label className="text-md mb-1 px-6 font-medium leading-6 text-main">
                Genres
              </Select.Label>

              {genres.map((genre, index) => (
                <SelectItem key={index} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-zinc-50 text-main">
            <CaretDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function SelectItem({ value, children }: SelectItemProps) {
  return (
    <Select.Item
      value={value}
      className="text-md relative flex h-6 select-none items-center rounded pl-6 pr-9 leading-none text-zinc-500 duration-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-200/70 data-[disabled]:text-zinc-400 data-[highlighted]:text-zinc-700 data-[highlighted]:outline-zinc-400"
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
        <Check />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

export function ButtonMoreOptions() {
  return (
    <div className="h-9 w-9 cursor-pointer place-self-end bg-zinc-50 p-2 shadow-[0_2px_10px] shadow-black/10 outline-zinc-400 duration-200 hover:bg-zinc-200/50 hover:shadow-md data-[placeholder]:text-zinc-500">
      <SlidersHorizontal size={22} className="text-zinc-500 duration-200 hover:text-zinc-600" />
    </div>
  );
}
