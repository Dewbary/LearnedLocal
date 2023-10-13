import { EnvelopeIcon } from "@heroicons/react/24/solid";
import CustomModal from "~/components/common/CustomModal";

type Props = {
  showSubscribeModal: boolean;
};

const EmailSignup = ({ showSubscribeModal }: Props) => {
  return (
    <CustomModal
      visible={showSubscribeModal}
      button={
        <div className="fixed bottom-3 right-3 z-10 flex flex-row items-center justify-center gap-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 p-4 drop-shadow-md hover:cursor-pointer hover:from-amber-300 hover:to-amber-300 lg:bottom-10 lg:right-10">
          <div className="font-3xl hidden pl-2 font-bold text-white lg:flex">
            Subscribe for experience updates!
          </div>
          <div className="rounded-full bg-white p-2">
            <EnvelopeIcon className="w-5 text-amber-500" />
          </div>
        </div>
      }
    >
      <div className="flex flex-row items-center justify-between bg-gradient-to-r from-amber-400 via-amber-200 to-white py-4 pr-6 pl-10 shadow-lg lg:rounded-t-3xl">
        <h1 className="text-3xl font-bold">Subscribe to experience updates</h1>
      </div>
      <iframe
        src="https://cdn.forms-content.sg-form.com/c47b4367-ff5d-11ed-ac99-0292391286ae"
        title="Subscription Form"
        className="h-full w-full pr-4"
      />
    </CustomModal>
  );
};

export default EmailSignup;
