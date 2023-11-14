import * as React from "react";

type Props = {
  onResetFilters: () => void;
};

const ResetFiltersBtn = ({ onResetFilters }: Props) => {
  return (
    <button className="text-sm font-bold" onClick={onResetFilters}>
      Reset filters
    </button>
  );
};

export default ResetFiltersBtn;
