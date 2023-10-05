import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

export default function Date({ dateString }: Props) {
  if (!dateString) return null;

  const date: Date = parseISO(dateString);
  return (
    <time dateTime={date.toISOString()}>{format(date, "LLLL d, yyyy")}</time>
  );
}
