import Counter from "~/components/common/Counter";
import { Typography } from "~/components/common/Typography";

type Props = {
  registreeCount: number;
  setRegistreeCount?: React.Dispatch<React.SetStateAction<number>>;
}

export default function GuestCounter({registreeCount, setRegistreeCount} : Props) {
  return (
    <>
    <div className="mt-4 flex flex-row items-center justify-between rounded-2xl border border-ll-slate px-6 py-4">
        <div className="flex flex-col">
          <div className={Typography.InputLabel}>Guests</div>
          <div className={Typography.BodyText}>{registreeCount} guest{registreeCount !== 1 ? "s" : ""}</div>
        </div>
        {setRegistreeCount && (
          <Counter count={registreeCount} setCount={setRegistreeCount} />
        )}
      </div>
    </>
  )
}