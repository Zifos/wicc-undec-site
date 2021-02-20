import { useSession, signIn, signOut } from "next-auth/client";
import { ReactElement } from "react";

export default function Component(): ReactElement {
  const [session, loading] = useSession();

  if (loading) {
    return <>Loading</>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
