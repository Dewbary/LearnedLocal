import { SignInButton, SignOutButton } from "@clerk/nextjs";

type Props = {
  isSignedIn: boolean;
};

const SignInArea = ({ isSignedIn }: Props) => {
  if (isSignedIn)
    return (
      <SignOutButton>
        <button className="">Sign out</button>
      </SignOutButton>
    );

  return (
    <SignInButton>
      <button className="">Sign in</button>
    </SignInButton>
  );
};

export default SignInArea;
