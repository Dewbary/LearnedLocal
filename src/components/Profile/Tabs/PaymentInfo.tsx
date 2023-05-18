import { Dispatch, SetStateAction } from "react";
import SavingInputField from "../SavingInputField";

type Props = {
    venmoAccount: string,
    setVenmoAccount: Dispatch<SetStateAction<string>>,
    zelleAccount: string,
    setZelleAccount: Dispatch<SetStateAction<string>>,
}

export default function PaymentInfo({venmoAccount, setVenmoAccount, zelleAccount, setZelleAccount}: Props) {
    return (
        <div className="flex flex-col gap-10 mx-3 lg:mx-0">
            <h1 className="text-3xl lg:text-4xl text-center lg:text-left">Payment Information</h1>
            <SavingInputField label="Venmo Username (optional)" savedValue={venmoAccount} setSavedValue={setVenmoAccount} />
            <SavingInputField label="Zelle Email (optional)" savedValue={zelleAccount} setSavedValue={setZelleAccount} />
        </div>
    )
}