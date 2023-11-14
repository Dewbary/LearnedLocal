import * as React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import type { Filter } from "~/components/types";

type Props<T extends Filter> = {
  selectedFilter: T | undefined;
  filters: T[];
  onFilterSelect: (filter: T) => void;
};

const ExpFilterBtn = <T extends Filter>({
  selectedFilter,
  filters,
  onFilterSelect,
}: Props<T>) => {
  if (!selectedFilter) return null;

  return (
    <div className="dropdown">
      <label
        tabIndex={0}
        className="inline-flex cursor-pointer content-center items-center rounded-3xl border border-ll-black px-4 py-2 text-sm duration-100 ease-in-out hover:bg-ll-slate hover:bg-opacity-20"
      >
        {selectedFilter.name}
        <ChevronDownIcon className="ml-2 h-4 w-4 rounded-full" />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box z-[1] mt-2 w-36 bg-base-100 p-2 shadow"
      >
        {filters &&
          filters.map((filter) => (
            <li key={filter.name}>
              <button onClick={() => onFilterSelect(filter)}>
                {filter.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExpFilterBtn;
