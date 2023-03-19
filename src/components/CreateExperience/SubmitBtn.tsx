import classNames from "classnames";
import { useFormikContext } from "formik";
import React from "react";

const SubmitBtn = () => {
  const { dirty, isSubmitting } = useFormikContext();
  return (
    <div>
      <button
        type="submit"
        className={classNames({
          "btn-primary btn": true,
          loading: isSubmitting,
        })}
        disabled={!dirty}
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitBtn;
