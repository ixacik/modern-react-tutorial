import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <nav className="border-border bg-card fixed inset-0 bottom-auto flex h-20 w-full items-center justify-between border-b px-5">
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-lg font-semibold text-transparent">
        Gallery
      </span>
      <SignedOut>
        <SignInButton>Sign In</SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
