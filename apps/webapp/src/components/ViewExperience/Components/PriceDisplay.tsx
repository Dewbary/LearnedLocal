import { Typography } from "~/components/common/Typography";

type Props = {
  isFree: boolean;
  pricePerParticipant: number;
  participantCount: number;
}

export default function PriceDisplay({isFree, pricePerParticipant, participantCount} : Props) {

  const calculatePrice = () => {
    return (Math.ceil(participantCount * pricePerParticipant * 100) / 100).toFixed(
      2
    );
  };

  return (
    <>
      <div className="mt-4 rounded-2xl border border-ll-slate px-6 py-4">
        <div className={Typography.InputLabel}>Total Price</div>
        <div className={Typography.BodyText}>
          {isFree ? (
            <>Free</>
          ) : (
            <>${calculatePrice()}</>
          )}
        </div>
      </div>
    </>
  )
}