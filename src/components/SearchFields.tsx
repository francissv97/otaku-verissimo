import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";
import * as Select from "@radix-ui/react-select";
import { Check, CaretDown, CaretUp } from "phosphor-react";
import { genres } from "../utils/variablesQueries";

import {
  MagnifyingGlass,
  Tag,
  SlidersHorizontal,
  FunnelSimple,
  X,
} from "phosphor-react";

type SearchFields = {
  search: string;
  genres: string[];
  year: number;
  season: "WINTER" | "SUMMER" | "SPRING" | "FALL";
  format:
    | "TV"
    | "MOVIE"
    | "TV_SHORT"
    | "SPECIAL"
    | "OVA"
    | "ONA"
    | "MUSIC"
    | "ONE_SHOT";
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

export function InputSearch({
  searchTerm,
  searchParams,
  setSearchParams,
}: InputSearchProps) {
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
    <div className="flex flex-col w-full md:max-w-xs gap-2">
      <span className="font-medium text-zinc-500">Search</span>
      <div className="flex gap-2 items-center bg-zinc-50 rounded shadow-zinc-300 shadow-lg px-2">
        <MagnifyingGlass size={22} className="text-zinc-400" weight="bold" />
        <input
          type="text"
          onChange={handleSearch}
          value={displayValue}
          className="w-full text-md leading-none text-zinc-500 outline-none caret-main/70 bg-transparent p-2"
        />
        <button
          onClick={handleClear}
          disabled={displayValue.length <= 0}
          className={`group hover:bg-zinc-200 p-1 duration-300 rounded-full ${
            displayValue ? "opacity-100" : "opacity-0"
          }`}
        >
          <X
            size={18}
            className="text-zinc-400/70 duration-200 group-hover:text-red-400"
            weight="bold"
          />
        </button>
      </div>
    </div>
  );
}

export function SelectFieldGenres() {
  return (
    <Select.Root>
      <Select.Trigger
        className="inline-flex min-w-[100px] items-center justify-between rounded px-4 text-sm leading-none h-9 gap-1 bg-zinc-50 text-main shadow-[0_2px_10px] shadow-black/10 hover:shadow-md hover:bg-zinc-200/50 data-[placeholder]:text-zinc-500 outline-zinc-400 duration-200"
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
          className="mt-1 overflow-hidden bg-zinc-50 rounded-md shadow-lg shadow-black/10"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-zinc-50 text-zinc-500 cursor-default">
            <CaretUp />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            <Select.Group>
              <Select.Label className="px-6 text-md leading-6 text-main font-medium mb-1">
                Genres
              </Select.Label>

              {genres.map((genre, index) => (
                <SelectItem key={index} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-zinc-50 text-main cursor-default">
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
      className="text-md leading-none text-zinc-500 rounded flex items-center h-6 pr-9 pl-6 relative select-none data-[disabled]:text-zinc-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-zinc-400 data-[highlighted]:bg-zinc-200/70 data-[highlighted]:text-zinc-700 duration-200"
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
        <Check />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

export function ButtonMoreOptions() {
  return (
    <div className="w-9 h-9 p-2 place-self-end bg-zinc-50 shadow-[0_2px_10px] shadow-black/10 hover:shadow-md hover:bg-zinc-200/50 data-[placeholder]:text-zinc-500 outline-zinc-400 duration-200 cursor-pointer">
      <SlidersHorizontal
        size={22}
        className="text-zinc-500 hover:text-zinc-600 duration-200"
      />
    </div>
  );
}
