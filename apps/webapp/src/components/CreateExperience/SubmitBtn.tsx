import classNames from "classnames";
import { useFormikContext } from "formik";
import React from "react";

type Props = {
  isEditing: boolean;
};

const SubmitBtn = ({ isEditing }: Props) => {
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
        {isEditing ? "Update" : "Submit"}
      </button>
    </div>
  );
};

export default SubmitBtn;
