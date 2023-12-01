import * as React from "react";
import DateSelectionPage from "./DateSelectionPage";
import TimeSelectionPage from "./TimeSelectionPage";
import ConfirmationPage from "./ConfirmationPage";
import RequestSentPage from "./RequestSentPage";

type Props = {};

const RequestTimeModal = ({}: Props) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (currentPage === 0)
    return <DateSelectionPage goToNextPage={goToNextPage} />;
  if (currentPage === 1)
    return (
      <TimeSelectionPage
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
    );
  if (currentPage === 2)
    return (
      <ConfirmationPage
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
    );
  if (currentPage === 3)
    return <RequestSentPage setCurrentPage={setCurrentPage} />;
  return null;
};

export default RequestTimeModal;
