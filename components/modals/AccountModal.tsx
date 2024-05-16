"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import RegistrationForm from "../forms/authentication/RegisterFormStep";
import { getAccountByUserId, getUserByEmail } from "@/actions/user.actions";
import { useAtom, useAtomValue } from "jotai";
import { AuthFormData } from "../forms/authentication/AuthStepWrapper";
import { useEffect, useState } from "react";
import { Account, User } from "@prisma/client";
import AccountModalForm from "../forms/authentication/AccountModalForm";

const AccountModal = () => {
  const [user, setUser] = useState<User | null | undefined>();
  const [account, setAccount] = useState<Account | null | undefined>();
  const [formData] = useAtom(AuthFormData);

  useEffect(() => {
    // Fetch user data when the component mounts or when formData.email changes
    const fetchUser = async () => {
      try {
        const userData = await getUserByEmail(formData.email as string);
        const accountData = await getAccountByUserId(userData?.id as string);
        setUser(userData); // Update user state with fetched data
        setAccount(accountData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Set user state to null if there's an error
      }
    };

    if (formData.email) {
      fetchUser(); // Call fetchUser if formData.email exists
    }
  }, [formData.email]); // Trigger useEffect when formData.email changes
  return (
    <>
      <Card className=" border-none shadow-none ">
        <CardHeader className="shadow-none border-b border-b-borderB p-0 py-3">
          <CardTitle className="text-base text-ellipsis font-bold text-center">
            Welcome Back, {user ? user.name : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative overflow-y-auto custom-scrollbar px-4 pt-6 pb-3">
          <AccountModalForm user={user} account={account} />
        </CardContent>
      </Card>
    </>
  );
};

export default AccountModal;
