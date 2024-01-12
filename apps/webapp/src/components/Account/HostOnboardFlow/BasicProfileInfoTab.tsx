import PhotoUploadComponent from "~/components/Account/PhotoUploadComponent";
import InputField from "../InputField";

export default function BasicProfileInfoTab() {
  return (
    <>
      <h1 className="font-raleway font-bold text-3xl mb-5 w-72 lg:w-full lg:text-4xl lg:mb-8">Set up your hosting profile</h1>
      <div className="flex flex-col gap-5 w-full">
        <PhotoUploadComponent name="profileImage" />  
        <InputField name="personalTitle" displayName="PROFILE TAGLINE" placeholder="Art enthusiast, pastry chef, etc." note="Maximum 35 characters" required={true} cyTestData="personalTitleField"/>
        <InputField name="bio" displayName="BIO" placeholder="Tell your users a little about your background and interests" as="textarea" note="Maximum 700 characters" required={true} cyTestData="bioField"/>
        <InputField name="insta" displayName="INSTAGRAM HANDLE" placeholder="@learnedlocal" cyTestData="instaField"/>
        <InputField name="facebook" displayName="FACEBOOK PROFILE LINK" placeholder="facebook.com/your_page_link" cyTestData="facebookField"/>
        <InputField name="phone" displayName="PHONE NUMBER" placeholder="801-123-4567" required={true} cyTestData="phoneField"/> 
      </div>
      
    </>
  )
}