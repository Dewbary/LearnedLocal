import * as React from "react";
import { Typography } from "~/components/common/Typography";

type Props = {
  onResetFilters: () => void;
};

const ResetFiltersBtn = ({ onResetFilters }: Props) => {
  return (
    <button className={Typography.InfoText} onClick={onResetFilters}>
      Reset filters
    </button>
  );
};

export default ResetFiltersBtn;
