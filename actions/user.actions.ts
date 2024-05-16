"use server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserByPhone = async (phone: any) => {
  try {
    const user = db.user.findFirst({
      where: {
        phoneNumber: phone,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    return null;
  }
};
