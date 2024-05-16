import { useState } from "react";
import { useAtom } from "jotai/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AuthFormData,
  useStepperAuthOne,
} from "../forms/authentication/AuthStepWrapper";
import EmailLoginForm from "../forms/authentication/LoginFormStep";
import PhoneLoginForm from "../forms/authentication/PhoneLoginForm";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useDialogModalAtom } from "@/lib/atom";

const PhoneLoginModal = () => {
  const { step, setStep, resetStepper } = useStepperAuthOne();
  const [showEmail, setShowEmail] = useState(false);
  const [formData, setFormData] = useAtom(AuthFormData);
  const { otpText } = useDialogModalAtom();

  const handleBack = () => {
    if (otpText === "whatsapp") {
      setStep(4);
    }
    if (otpText === "call") {
      setStep(4);
    }
    if (otpText === "sms") {
      resetStepper();
    }
  };
  return (
    <>
      <Card className=" border-none shadow-none pt-2">
        <Button
          variant="outline"
          className="cursor-pointer absolute flex text-xs items-center ml-4"
          onClick={handleBack}
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
        <CardHeader className="shadow-none border-b border-b-borderB p-0 py-3">
          <CardTitle className="text-base text-ellipsis font-bold text-center">
            Confirm your number
          </CardTitle>
        </CardHeader>
        <CardContent className="relative overflow-y-auto custom-scrollbar px-4 pt-6 ">
          <PhoneLoginForm />
        </CardContent>
      </Card>
    </>
  );
};

export default PhoneLoginModal;
