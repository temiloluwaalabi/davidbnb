"use server";

import { signOut } from "@/auth";

export const Logout = async () => {
  // Server stuffs
  await signOut();
};
