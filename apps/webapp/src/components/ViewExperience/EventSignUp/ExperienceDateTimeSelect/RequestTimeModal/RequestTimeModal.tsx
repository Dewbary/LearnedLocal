import * as React from "react";
import DateSelectionPage from "./DateSelectionPage";
import TimeSelectionPage from "./TimeSelectionPage";
import ConfirmationPage from "./ConfirmationPage";
import RequestSentPage from "./RequestSentPage";
import { Form, Formik } from "formik";
import { TimeRequest } from "~/components/types";
import { api } from "~/utils/api";
import { getHours } from "~/components/common/DateAndTimePicker/DateAndTimeUtils";
import { SignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

type Props = {
  experienceTitle: string;
  hostEmail: string;
};

const RequestTimeModal = ({ experienceTitle, hostEmail }: Props) => {
  const user = useUser();
  const router = useRouter();
  const sendTimeRequestEmail = api.email.sendTimeRequestEmail.useMutation();

  const [currentPage, setCurrentPage] = React.useState(0);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const getCurrentPage = (): React.ReactNode => {
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
      return <ConfirmationPage goToPrevPage={goToPrevPage} />;
    if (currentPage === 3)
      return <RequestSentPage setCurrentPage={setCurrentPage} />;
    return null;
  };

  const getInitialValues = (): TimeRequest => ({
    date: new Date(),
    hour: 12,
    minute: 12,
    ampm: "am",
  });

  return (
    <div className="m-12">
      <SignedIn>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={async (request) => {
            goToNextPage();

            const requestedDateTime = new Date(request.date);
            requestedDateTime.setHours(getHours(request.hour, request.ampm));
            requestedDateTime.setMinutes(request.minute);

            await sendTimeRequestEmail.mutateAsync({
              date: requestedDateTime,
              experienceTitle: experienceTitle,
              customerName: user.user?.firstName ?? "Someone",
              customerEmail: user.user?.emailAddresses.toString() ?? "",
              hostEmail: hostEmail,
            });
          }}
        >
          <Form>{getCurrentPage()}</Form>
        </Formik>
      </SignedIn>

      <SignedOut>
        <SignIn redirectUrl={router.asPath} />
      </SignedOut>
    </div>
  );
};

export default RequestTimeModal;
