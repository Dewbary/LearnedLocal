import * as React from "react";
import Button from "~/components/common/Button";
import cx from "classnames";
import { Typography } from "~/components/common/Typography";
import Image from "next/image";
import textlistGraphic from "../../../../../../../assets/textlist/textlist_subscribed_graphic.png";

type Props = {
  setCurrentPage: (pageNum: number) => void;
};

const RequestSentPage = ({ setCurrentPage }: Props) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className={cx(Typography.PrimaryTitle, "mb-4")}>Request Sent</div>
      <div className={cx(Typography.BodyText, "mb-4 text-center")}>
        Your request has been sent to the host. They will do their best to
        accommodate your schedule.
      </div>
      <div className="aspect-h-1 aspect-w-2 w-96">
        <Image
          src={textlistGraphic}
          alt={"A phone with some texts"}
          fill
          className="object-contain"
        />
      </div>
      <Button
        className={`${Typography.ButtonText} mt-8 w-48 rounded-full bg-ll-orange px-6 py-4 text-white`}
        text="Submit another"
        onClick={() => setCurrentPage(0)}
      />
    </div>
  );
};

export default RequestSentPage;
