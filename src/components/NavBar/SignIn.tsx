import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {

    const { data: session } = useSession();

    return (
        <div>
            { session ? (
                <button onClick={() => signOut()}>Sign out { session.user.name }</button>
            ) : (
                <button onClick={() => signIn()}>Sign in!</button>
            )}
        </div>
    )
}