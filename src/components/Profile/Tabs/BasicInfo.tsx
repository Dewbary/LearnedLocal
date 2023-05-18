import { Dispatch, SetStateAction } from "react";
import SavingInputField from "../SavingInputField";
import SavingTextArea from "../SavingTextArea";

type Props = {
    firstName: string,
    setFirstName: Dispatch<SetStateAction<string>>,
    lastName: string,
    setLastName: Dispatch<SetStateAction<string>>,
    bio: string,
    setBio: Dispatch<SetStateAction<string>>,
    qualis: string,
    setQualis: Dispatch<SetStateAction<string>>,
    instagram: string,
    setInstagram: Dispatch<SetStateAction<string>>,
    facebook: string,
    setFacebook: Dispatch<SetStateAction<string>>
}

export default function BasicInfo({firstName, setFirstName, lastName, setLastName, bio, setBio, qualis, setQualis, instagram, setInstagram, facebook, setFacebook}: Props) {
    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-4xl">Basic Profile Information</h1>
            <SavingInputField label="First Name" savedValue={firstName} setSavedValue={setFirstName} />
            <SavingInputField label="Last Name" savedValue={lastName} setSavedValue={setLastName} />
            <SavingTextArea label="Biography / About You" savedValue={bio} setSavedValue={setBio} /> 
            <SavingTextArea label="Qualifications" savedValue={qualis} setSavedValue={setQualis} />
            <SavingInputField label="Instagram Handle (optional)" savedValue={instagram} setSavedValue={setInstagram} />
            <SavingInputField label="Facebook Profile Link (optional)" savedValue={facebook} setSavedValue={setFacebook} />
        </div>
    )
}