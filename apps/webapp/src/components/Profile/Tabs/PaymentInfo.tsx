import { Field } from "formik";

export default function PaymentInfo() {
    return (
        <div className="flex flex-col gap-10 mx-3 lg:mx-0 w-fit">
            <h1 className="text-3xl lg:text-4xl text-center lg:text-left">Payment Information</h1>
            <p className="w-80">
                If you are hosting an experience, please fill out one of the following two fields so we can pay you!
                You&apos;ll receive payment for teaching within a few days of hosting the experience.
            </p>
            <div className="w-full flex flex-col">
                <label htmlFor="venmo">Venmo Handle</label>
                <Field id="venmo" name="venmo" className="border-2 border-slate-500 rounded-md py-1 px-2"/>
            </div>
            <div className="w-full flex flex-col">
                <label htmlFor="zelle">Zelle Account</label>
                <Field id="zelle" name="zelle" className="border-2 border-slate-500 rounded-md py-1 px-2"/>
            </div>
        </div>
    )
}