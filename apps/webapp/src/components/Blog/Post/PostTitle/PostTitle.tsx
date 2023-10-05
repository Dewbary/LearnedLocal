import { PropsWithChildren } from "react";

export default function PostTitle({ children }: PropsWithChildren) {
  return (
    <h1 className="my-8 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-6xl">
      {children}
    </h1>
  );
}
