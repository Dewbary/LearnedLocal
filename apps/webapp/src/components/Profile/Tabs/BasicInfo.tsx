import { Dispatch, SetStateAction } from "react";
import SavingInputField from "../SavingInputField";
import SavingTextArea from "../SavingTextArea";
import { useUser } from "@clerk/nextjs";
import { uploadImageToBucket } from "~/utils/images";

type Props = {
    firstName: string,
    setFirstName: Dispatch<SetStateAction<string>>,
    lastName: string,
    setLastName: Dispatch<SetStateAction<string>>,
    bio: string,
    setBio: Dispatch<SetStateAction<string>>,
    social: string,
    setSocial: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    phone: string,
    setPhone: Dispatch<SetStateAction<string>>,
    profileImage: string,
    setProfileImage: Dispatch<SetStateAction<string>>,
}

export default function BasicInfo(
    {
        firstName, setFirstName, 
        lastName, setLastName, 
        bio, setBio, 
        social, setSocial,
        email, setEmail, 
        phone, setPhone, 
        profileImage, setProfileImage
    }: Props) {

    const { user } = useUser();

    const handleProfileImageSelected = async (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file || !user) return;
    
        const imgPath = await uploadImageToBucket(file, user.id);
        if (
          !process.env.NEXT_PUBLIC_SUPABASE_URL ||
          !process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME
        )
          return;
        const profileImageFilePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME}/${imgPath}`;
        setProfileImage(profileImageFilePath);
      };

    return (
        <div className="flex flex-col gap-10 mx-3 lg:mx-0">
            <h1 className="text-3xl lg:text-4xl text-center lg:text-left">Basic Profile Information</h1>
            <SavingInputField label="First Name" savedValue={firstName} setSavedValue={setFirstName} />
            <SavingInputField label="Last Name" savedValue={lastName} setSavedValue={setLastName} />
            <SavingInputField label="Contact Email" savedValue={email} setSavedValue={setEmail} />
            <SavingInputField label="Contact Phone" savedValue={phone} setSavedValue={setPhone} />

            {/* Profile Image Uploader */}
            <div className="flex flex-col items-center w-fit gap-6">
                <h3 className="font-bold self-start">Profile Picture</h3>
                <div className="h-32 w-32 overflow-hidden rounded-full">
                {profileImage ? (
                    <img
                    src={profileImage}
                    className="h-full w-full rounded-full object-cover shadow-lg"
                    />
                ) : (
                    <div className="h-full w-full bg-gray-100 shadow-lg"></div>
                )}
                </div>

                <input
                type="file"
                className="file-input-bordered file-input file-input-sm w-full max-w-xs"
                onChange={(e) => {
                    void handleProfileImageSelected(e);
                }}
                />
            </div>

            <SavingTextArea label="Biography / About You" savedValue={bio} setSavedValue={setBio} /> 
            <SavingInputField label="Social Media" savedValue={social} setSavedValue={setSocial} />
        </div>
    )
}