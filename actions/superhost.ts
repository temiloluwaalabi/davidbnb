"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const superhost = async () => {
  const role = await currentRole();

  if (role === UserRole.SUPERHOST) {
    return {
      success: "Allowed",
    };
  }

  return {
    error: "Forbidden",
  };
};
