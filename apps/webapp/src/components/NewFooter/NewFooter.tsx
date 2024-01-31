import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { Facebook, Instagram } from "react-feather";
import { api } from "~/utils/api";
import * as Yup from "yup";
import { Typography } from "../common/Typography";

type FormValues = {
  email: string;
}

export default function Footer() {

  const emailSignup = api.email.signUpForWaitlist.useMutation();

  const handleSignupClick = async (values: FormValues) => {
    await emailSignup.mutateAsync({
      experienceTitle: "GENERAL LIST",
      newContactEmail: values.email,
      newContactFirstName: "GENERAL LIST",
      newContactLastName: "GENERAL LIST",
      newContactPhoneNumber: "GENERAL LIST"
    })
    alert("You've successfully subscribed to our email list!");
  }

  return (
    <>
      <div className="flex w-full flex-col gap-10 bg-ll-black px-6 py-8 text-ll-grey lg:flex-row lg:gap-32 lg:px-14">
        <div className="flex flex-col gap-3 lg:flex-auto">
          <div className={Typography.SectionTitle}>STAY IN THE LOOP</div>
          <div className={Typography.BodyText}>
            Sign up with your email address to receive experience updates.
          </div>
          <Formik
            initialValues={{
              email: ""
            }}
            onSubmit={(values:FormValues) => {void handleSignupClick(values)}}
            validationSchema={Yup.object({
              email: Yup.string().email("Please enter a valid email").required()
            })}
          >
            <Form className="flex flex-row gap-4 font-inter">
              <Field
                name="email"
                className="w-44 px-3 text-sm text-ll-black"
                placeholder="Email Address"
              />
              <button type="submit" className="flex flex-row items-center justify-center rounded-full border border-ll-black bg-ll-grey px-3 py-3 text-sm text-ll-black transition-colors hover:cursor-pointer hover:border-ll-grey hover:bg-ll-black hover:text-ll-grey lg:px-7">
                Sign Up
              </button>
            </Form>
          </Formik>
          <Link className="underline hover:cursor-pointer" href="/privacy">
            <span className={Typography.BodyText}>Privacy Policy</span>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <div className={Typography.SectionTitle}>CONTACT US</div>
          <div className={Typography.BodyText}>(385) 309-3194</div>
          <div className={Typography.BodyText}>
            11124 N 6000 W<br />
            Highland, UT 84003
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className={Typography.SectionTitle}>FOLLOW US</div>
          <div className="flex flex-row gap-3">
            <Link
              href="https://www.instagram.com/learnedlocal/"
              target="_blank"
              className="rounded-full bg-ll-grey p-1 text-ll-black hover:bg-ll-black hover:text-ll-grey"
            >
              <Instagram />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100092194838632"
              target="_blank"
              className="rounded-full bg-ll-grey p-1 text-ll-black hover:bg-ll-black hover:text-ll-grey"
            >
              <Facebook />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
