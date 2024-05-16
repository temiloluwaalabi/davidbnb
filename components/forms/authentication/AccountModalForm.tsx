import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Locale, i18n } from "@/i18n.config";
import { getLocalizedUrl, maskEmail } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Account, User } from "@prisma/client";
import { MailIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import React, { use } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  AuthFormData,
  initialData,
  useStepperAuthOne,
} from "./AuthStepWrapper";
import { useAtom } from "jotai";

interface AccountModalProps {
  user: User | null | undefined;
  account: Account | null | undefined;
}
const AccountModalForm = ({ user, account }: AccountModalProps) => {
  const { step, goToNextStep, setStep } = useStepperAuthOne();
  const [formData, setFormData] = useAtom(AuthFormData);
  const params = useParams();
  let lang: Locale;
  // const transCategoriesRef = useRef<Categories | null>(null);
  if (Array.isArray(params.lang)) {
    lang = params.lang[0] as Locale;
  } else {
    lang = params.lang as Locale;
  }
  if (!i18n.locales.includes(lang)) {
    lang = i18n.defaultLocale;
  }
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("redirectTo") ?? DEFAULT_LOGIN_REDIRECT;
  const redirecUrl = getLocalizedUrl(callbackUrl, lang as Locale);
  const handleClick = (
    provider: "google" | "github" | "facebook" | "apple"
  ) => {
    signIn(provider, {
      callbackUrl: redirecUrl,
    });
    setFormData(initialData);
    // if (urlError) {
    //   toast({
    //     description: "Email already in use with different provide",
    //   });
    // }
  };
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col items-center justify-center gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-20">
                {user?.image && <AvatarImage src={user.image} />}
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{user && user.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center gap-2">
          <MailIcon />
          <p>{user && maskEmail(user.email as string)}</p>
        </div>
        {account?.provider === "google" && (
          <Button
            variant="outline"
            className="h-[48px] rounded-[8px] mt-4 shadow-none no-focus text-sm font-medium flex items-center justify-start outline-none w-full border border-secondary-textBlack"
            onClick={() => handleClick("google")}
          >
            <FcGoogle className="size-6 mr-[30%] text-blue-800" />
            Continue with Google
          </Button>
        )}
        {account?.provider === "github" && (
          <Button
            variant="outline"
            className="h-[48px] rounded-[8px] shadow-none no-focus text-sm font-medium flex items-center justify-start outline-none w-full border border-secondary-textBlack"
            onClick={() => handleClick("github")}
          >
            <FaGithub className="size-6 mr-[30%] text-blue-800" />
            Continue with Github
          </Button>
        )}
      </div>
      <div className="flex items-center mt-3">
        <span className="text-xs">Not you?</span>
        <Button
          className="p-0 ms-1 underline"
          variant="link"
          onClick={() => setStep(2)}
        >
          Use another account
        </Button>
      </div>
    </div>
  );
};

export default AccountModalForm;
