import { ErrorMessage, Field } from "formik";
import PhotoUploadComponent from "../PhotoUploadComponent";

export default function BasicInfo() {

    return (
        <div className="flex flex-col gap-10 mx-3 lg:mx-0 w-fit">
            <h1 className="text-3xl lg:text-4xl text-center lg:text-left">Basic Profile Information</h1>
            <div className="w-full flex flex-col">
                <label htmlFor="firstName">First Name &#42;</label>
                <Field id="firstName" name="firstName" className="border-2 border-slate-500 rounded-md py-1 px-2"/>
                <div className="text-red-600">
                    <ErrorMessage name="firstName"/>
                </div>
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="lastName">Last Name &#42;</label>
                <Field id="lastName" name="lastName" className="border-2 border-slate-500 rounded-md py-1 px-2"/>
                <div className="text-red-600">
                    <ErrorMessage name="lastName"/>
                </div>
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" className="border-2 border-slate-500 rounded-md py-1 px-2"/>
                <div className="text-red-600">
                    <ErrorMessage name="email"/>
                </div>
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="phone">Phone</label>
                <Field id="phone" name="phone" className="border-2 border-slate-500 rounded-md py-1 px-2"/>
                <div className="text-red-600">
                    <ErrorMessage name="phone"/>
                </div>
            </div>

            <PhotoUploadComponent name="profileImage"/>

            <div className="w-full flex flex-col">
                <label htmlFor="bio">About You</label>
                <Field id="bio" name="bio" as="textarea" className="border-2 border-slate-500 rounded-md py-1 px-2"/>
                <div className="text-red-600">
                    <ErrorMessage name="bio"/>
                </div>
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="social">Social Media Link</label>
                <Field id="social" name="social" placeholder="https://instagram.com/your_profile_link" className="border-2 border-slate-500 rounded-md py-1 px-2"/>
                <div className="text-red-600">
                    <ErrorMessage name="social"/>
                </div>
            </div>
        </div>
    )
}