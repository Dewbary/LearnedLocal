import { Field, Form, Formik } from "formik";
import AdminNavBar from "~/components/Admin/AdminNavBar";
import { FormLabel } from "~/components/CreateExperience/Form/FormLabel";
import { api } from "~/utils/api";

const TextList = () => {
  const sendTextMessage = api.textlist.sendTextMessage.useMutation();

  const createTextMessage = async (message: string) => {
    await sendTextMessage.mutateAsync({
      message: message,
    });
  };

  return (
    <div className="h-screen w-full">
      <AdminNavBar />

      <div className="m-16">
        <Formik
          initialValues={{
            textMessage: "",
          }}
          onSubmit={(message) => createTextMessage(message.textMessage)}
        >
          <Form>
            <div>
              <FormLabel text={"Create Text Message"} />
              <Field
                name="textMessage"
                as="textarea"
                className="w-96 rounded-md outline outline-1"
              />
            </div>

            <div>
              <button
                type="submit"
                className=" rounded-lg bg-amber-400 px-3 py-1 hover:bg-amber-300"
              >
                Send Text Message
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default TextList;
