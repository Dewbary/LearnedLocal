import { Typography } from "~/components/common/Typography";

export default function FinishedTab() {
  return (
    <>
      <h1 className="text-center mb-5 w-72 lg:w-full lg:mb-8">
        <span className={Typography.PrimaryTitle}>You&apos;re all set!</span>
      </h1>
      <p className={Typography.BodyText}>Thanks for signing up for Learned Local! Click the button below to see local experiences near you!</p>
    </>
  )
}