import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStepperAuthOne } from "../forms/authentication/AuthStepWrapper";
import EmailLoginForm from "../forms/authentication/LoginFormStep";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

const LoginModal = () => {
  const { setStep } = useStepperAuthOne();

  return (
    <>
      <Card className=" border-none shadow-none ">
        <Button
          variant="outline"
          className="cursor-pointer absolute flex text-xs items-center ml-4"
          onClick={() => setStep(0)}
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
        <CardHeader className="shadow-none border-b border-b-borderB p-0 py-3">
          <CardTitle className="text-base text-ellipsis font-bold text-center flex items-center py-2">
            <span className="text-center  w-full">Log In</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative overflow-y-auto custom-scrollbar px-4 pt-6 ">
          <EmailLoginForm />
        </CardContent>
      </Card>
    </>
  );
};

export default LoginModal;
