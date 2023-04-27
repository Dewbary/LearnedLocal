import { SignInButton, SignOutButton } from "@clerk/nextjs";

type Props = {
  isSignedIn: boolean;
};

const SignInArea = ({ isSignedIn }: Props) => {
  if (isSignedIn)
    return (
      <button className="btn-secondary btn">
        <SignOutButton />
      </button>
    );

  return (
    <button className="btn-primary btn">
      <SignInButton />
    </button>
  );
};

export default SignInArea;
