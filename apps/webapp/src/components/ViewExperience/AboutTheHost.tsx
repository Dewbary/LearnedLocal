import { Profile } from "packages/db"
import { Instagram, Facebook } from "react-feather";

type Props = {
    profile: Profile;
    className?: string | null;
}

export default function AboutTheHost(props: Props) {

    const instaLink = `https://instagram.com/${props.profile.insta?.substring(1) || ""}`;
    const fbLink = props.profile.facebook || "";

    return (
        <>
            <div className={`bg-white shadow-md relative max-w-4xl ${props.className || ""}`}>
                
                <div className="p-5 flex flex-col items-center z-10 gap-4">
                    <h1 className="text-3xl font-bold z-10">About your host</h1>
                    <div className="w-44 h-44 rounded-full overflow-hidden z-10 shadow-md">
                        <img
                            src={props.profile.profileImage || ""}
                            alt="Profile Image"
                            className="z-10"
                        />
                    </div>
                    <h3 className="text-2xl">{props.profile.firstName} {props.profile.lastName}</h3>
                    <hr className="border w-full"/>
                    <p>{props.profile.bio}</p>
                    {(props.profile.facebook || props.profile.insta) && (
                        <div className="flex flex-row gap-4">
                            {props.profile.insta && (
                                <a href={instaLink} className="flex flex-row border-2 items-center gap-2 p-2 basis-1/2 flex-grow">
                                    <Instagram className="w-8 h-8"/>
                                    <span>{props.profile.insta}</span>
                                </a>
                            )}
                            {props.profile.facebook && (
                                <a href={fbLink} className="flex flex-row border-2 items-center gap-2 p-2 basis-1/2 flex-grow">
                                    <Facebook className="w-8 h-8"/>
                                    <span>{props.profile.firstName}&apos;s page</span>
                                </a>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="w-full bg-gradient-to-br from-amber-300 to-amber-500 h-40 absolute top-0 left-0 z-0" />
            </div>
        </>
    )
}