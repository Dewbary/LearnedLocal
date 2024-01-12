import { ErrorMessage, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import InputField from "~/components/Account/InputField"
import { api } from "~/utils/api"
import * as Yup from "yup";
import { useUser } from "@clerk/nextjs";

type FormValues = {
  oldPassword: string,
  newPassword: string
}

export default function PasswordTab () {

  const [isSaving, setIsSaving] = useState(false);
  const [saveToastVisible, setSaveToastVisible] = useState(false);
  const [oAuthAccountExists, setOAuthAccountExists] = useState(false);
  const { user } = useUser();

  const updatePassword = api.profile.updateClerkPassword.useMutation();

  const handleSubmit = async ({newPassword: password}: FormValues) => {
    setIsSaving(true);
    await updatePassword.mutateAsync({password});
    setIsSaving(false);
    setSaveToastVisible(true);
    setTimeout(() => {
      setSaveToastVisible(false);
    }, 2000);
  }

  useEffect(() => {
    const oAuthAccountID = user?.externalAccounts.at(0)?.id;
    if (oAuthAccountID && oAuthAccountID.length > 0) {
      setOAuthAccountExists(true);
    }
  }, [user]);
  

  return (
    <>
      <Formik
          initialValues={{
            oldPassword: "",
            newPassword: ""
          }}
          onSubmit={async (values: FormValues) => {await handleSubmit(values)}}
          validationSchema={Yup.object({
            newPassword: Yup.string().min(8, "Your password must be at least 8 characters long").required("You must provide a new password if you are changing it.")
          })}
          enableReinitialize={true}
        >
          <Form className="flex flex-col w-full gap-6">
            <h1 className="font-raleway text-4xl font-bold mb-5 hidden lg:block">Change password</h1>
            <InputField name="oldPassword" displayName="OLD PASSWORD" required type="password" disabled={oAuthAccountExists}/>
            <InputField name="newPassword" displayName="NEW PASSWORD" required type="password" note="8 characters min." disabled={oAuthAccountExists}/>
            <div className="font-inter text-sm text-red-500">
              <ErrorMessage name="newPassword" component={"div"} />
            </div>
            <button type="submit" className="bg-ll-orange rounded-full w-full py-4 text-center text-ll-grey font-inter text-sm flex flex-row items-center justify-center gap-3 disabled:bg-gray-400 lg:w-40 hover:opacity-70" disabled={oAuthAccountExists}>
              <span>Change Password</span><span className={`${isSaving ? "" : "hidden"} loading loading-spinner loading-sm hover:opacity-70`} />
            </button>
          </Form>
        </Formik>

        <div className={`transition-opacity ${saveToastVisible ? "opacity-100" : "opacity-0"} duration-1000 toast toast-center w-28 bg-gradient-to-br text-ll-grey bg-ll-dark-blue rounded-full bottom-8 font-inter text-sm text-center`}>
          <div>Password Changed!</div>
        </div>
    </>
  )
}