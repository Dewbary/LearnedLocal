import * as React from "react";

const FormPageContent = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-[400px] rounded-2xl border border-ll-slate">
      {children}
    </div>
  );
};

export default FormPageContent;
