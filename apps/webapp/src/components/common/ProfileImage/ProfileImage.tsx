import * as React from "react";
import Image from "next/image";

type Props = {
  profileImage: string | null | undefined;
};

const ProfileImage = ({ profileImage }: Props) => {
  return (
    <div className="absolute top-2 left-2 h-12 w-12 flex-none overflow-hidden rounded-full">
      {profileImage ? (
        <Image
          src={profileImage}
          alt="Profile Picture"
          className="rounded-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <img
          src="/profile_pic.png"
          alt="Profile Picture Anonymous"
          className="rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default ProfileImage;
