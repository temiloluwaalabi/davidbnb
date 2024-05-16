"use server";
import { RegisterSchema, RegistrationSchema } from "@/lib/validations";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById, getUserByPhone } from "./user.actions";
import { error } from "console";
import { db } from "@/lib/db";
import { differenceInYears, parseISO } from "date-fns";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./mail";

export const register = async (values: z.infer<typeof RegistrationSchema>) => {
  const validatedFields = RegistrationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields",
    };
  }

  const { email, password, firstName, lastName, dob, marketingMessage } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingEmailUser = await getUserByEmail(email);
  // const existingPhoneUser = await getUserByPhone({ phone });
  // const formattedDateOfBirth = new Date(dob).toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });
  const currentDate = new Date();
  const dobDate = new Date(values.dob);
  let userAge = currentDate.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    currentDate.getMonth() > dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() >= dobDate.getDate());

  // If the user hasn't had their birthday yet this year, subtract 1 from the age
  if (!hasHadBirthdayThisYear) {
    userAge--;
  }
  if (existingEmailUser) {
    return {
      error: "Email already in use!",
    };
  }
  if (userAge <= 18) {
    return {
      error: "You must be 18 and above",
    };
  }
  await db.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      hashedPassword: hashedPassword,
      email: email,
      // phoneNumber: phone,
      dob: dob,
      sendMarketing: marketingMessage,
      name: `${firstName} ${lastName}`, // Combine firstName and lastName
    },
  });

  // TODO: send email verification token
  // TODO: send email verification mail

  const verificationToken = await generateEmailVerificationToken(email);
  // const tokenUser = await getUserByEmail(verificationToken.email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    firstName
  );
  return {
    success: "Email Confirmation Link sent",
  };
};
