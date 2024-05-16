"use server";
import { EmailLoginSchema } from "@/lib/validations";
import * as z from "zod";
import { getUserByEmail } from "./user.actions";
import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  generateEmailVerificationToken,
  getEmailVerificationTokenByToken,
} from "./tokens";
import { db } from "@/lib/db";
import { Locale } from "@/i18n.config";
import { sendVerificationEmail } from "./mail";
import { getLocalizedUrl } from "@/lib/utils";

export const LoginByEmail = async (
  values: z.infer<typeof EmailLoginSchema>,
  lang: Locale,
  callbackUrl?: string | null
) => {
  const validatedFields = EmailLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUserByEmail = await getUserByEmail(email);
  if (
    !existingUserByEmail ||
    !existingUserByEmail.email ||
    !existingUserByEmail.hashedPassword
  ) {
    return {
      error: "Invalid credentials!",
    };
  }

  // if (!existingUserByEmail.emailVerified) {
  //   const verificationToken = await generateEmailVerificationToken(
  //     existingUserByEmail.email
  //   );
  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token,
  //     existingUserByEmail.firstName as string
  //   );
  //   return {
  //     error: "Account not verified, we have sent another confirmation mail",
  //   };
  // }

  const defaultUrl = `/${lang}${callbackUrl}`;
  console.log("default", defaultUrl);
  const localized = getLocalizedUrl(callbackUrl as string, lang as Locale);
  console.log("localized", localized);
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: "Successfully signed in!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          return {
            error: "Something went wrong",
          };
      }
    }
  }
};

export const EmailVerification = async (token: string) => {
  const existingToken = await getEmailVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token doesn't exist",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Email does not exist",
    };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Email verified",
  };
};
