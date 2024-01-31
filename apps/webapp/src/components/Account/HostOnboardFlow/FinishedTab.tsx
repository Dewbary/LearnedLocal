import { Typography } from "~/components/common/Typography";

export default function FinishedTab() {
  return (
    <>
      <h1 className="mb-5 w-72 lg:w-full lg:mb-8">
        <span className={Typography.PrimaryTitle}>You&apos;re all set!</span>
      </h1>
      <p className={Typography.BodyText}>Thanks for finishing your host profile. Find some ideas for your first experience by clicking the button below!</p>
    </>
  )
}