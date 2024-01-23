import * as React from "react";
import Button from "~/components/common/Button";

type Props = {};

const FormNavigationBtns = ({}: Props) => {
  return (
    <div className="flex space-x-2">
      <Button
        className="w-48 rounded-full border-2 border-ll-orange bg-white px-6 py-4 text-ll-orange"
        text="Back"
        onClick={() => console.log("Back")}
      />
      <Button
        className="w-48 rounded-full bg-ll-orange px-6 py-4 text-white"
        text="Send request"
        onClick={() => console.log("Send request")}
      />
    </div>
  );
};

export default FormNavigationBtns;
