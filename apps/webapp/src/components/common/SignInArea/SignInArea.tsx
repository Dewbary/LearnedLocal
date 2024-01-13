import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

type Props = {
  isSignedIn: boolean;
};

const SignInArea = ({ isSignedIn }: Props) => {

  const currentPath = usePathname();
  const signInUrl = `/account/signin?redirect_url=${encodeURI(currentPath)}`;
  const router = useRouter();

  if (isSignedIn)
    return (
      <SignOutButton signOutCallback={() => router.reload()}>
        <button className="btn content-center">Sign out</button>
      </SignOutButton>
    );

  return (
    <Link href={signInUrl} className="w-full">
      <button className="btn content-center w-full">Sign in</button>
    </Link>
  );
};

export default SignInArea;
