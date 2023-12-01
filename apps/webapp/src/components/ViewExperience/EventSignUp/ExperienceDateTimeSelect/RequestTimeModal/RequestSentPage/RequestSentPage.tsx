import * as React from "react";
import Button from "~/components/common/Button";

type Props = {
  setCurrentPage: (pageNum: number) => void;
};

const RequestSentPage = ({ setCurrentPage }: Props) => {
  return (
    <div className="">
      <Button text="Submit another" onClick={() => setCurrentPage(0)} />
    </div>
  );
};

export default RequestSentPage;
