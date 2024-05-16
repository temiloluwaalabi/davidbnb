import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStepperAuthOne } from "../forms/authentication/AuthStepWrapper";

import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import MoreOptionsStep from "../forms/authentication/MoreOptionsStep";

const MoreOptionsOTP = () => {
  const { goToPreviousStep } = useStepperAuthOne();

  return (
    <>
      <Card className=" border-none shadow-none pt-2">
        <Button
          variant="outline"
          className="cursor-pointer absolute flex text-xs items-center ml-4"
          onClick={() => goToPreviousStep()}
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
        <CardHeader className="shadow-none border-b border-b-borderB p-0 py-3">
          <CardTitle className="text-base text-ellipsis font-bold text-center">
            More Options
          </CardTitle>
        </CardHeader>
        <CardContent className="relative overflow-y-auto custom-scrollbar px-4 pt-6 ">
          <MoreOptionsStep />
        </CardContent>
      </Card>
    </>
  );
};

export default MoreOptionsOTP;
