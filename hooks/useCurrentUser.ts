"use client";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  return session?.user;
};
