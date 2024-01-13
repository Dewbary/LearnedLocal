import InputField from "../InputField";

export default function PaymentInfoTab() {
  return (
    <>
      <h1 className="font-raleway font-bold text-3xl mb-5 w-72 ml-5 lg:ml-0 lg:w-full lg:text-4xl lg:mb-8">Set up your hosting profile</h1>
      <div className="flex flex-col gap-5 w-full">
        <p className="font-inter">Learned Local uses Venmo and Zelle to pay hosts. Kindly complete the required fields, and please be aware that payment for your event will be processed within a few days following your experience.</p>
        <InputField name="venmo" displayName="VENMO HANDLE" placeholder="@learnedlocal" cyTestData="venmoField"/>
        <InputField name="zelle" displayName="ZELLE ACCOUNT" cyTestData="zelleField"/>
      </div>
    </>
  )
}