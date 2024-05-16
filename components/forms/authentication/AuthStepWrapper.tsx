"use client";
import { AuthenticationSchema } from "@/lib/validations";
import * as z from "zod";
import { atomWithReset, atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai/react";
import { cn } from "@/lib/utils";
import LoginModal from "@/components/modals/LoginModal";
import ResgisterForm from "./AuthenticationFirstStep";
import RegisterModal from "@/components/modals/RegisterModal";
import PhoneLoginModal from "@/components/modals/PhoneModal";
import MoreOptionsOTP from "@/components/modals/Options";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AccountModal from "@/components/modals/AccountModal";

// const ResgisterForm = dynamic(() => import("./AuthenticationFirstStep"), {
//   ssr: false,
// });
// const RegisterModal = dynamic(
//   () => import("@/components/modals/RegisterModal"),
//   {
//     ssr: false,
//   }
// );
// const PhoneLoginModal = dynamic(
//   () => import("@/components/modals/PhoneModal"),
//   {
//     ssr: false,
//   }
// );
// const LoginModal = dynamic(() => import("@/components/modals/LoginModal"), {
//   ssr: false,
// });
// const MoreOptionsOTP = dynamic(() => import("@/components/modals/Options"), {
//   ssr: false,
// });
export type ComboboxOption = {
  value: string;
  label: string;
};
export const initialData = {
  email: "" || undefined,
  phone: "" || undefined,
  countryCode: undefined,
  firstName: "" || undefined,
  lastName: "" || undefined,
  dob: "" || undefined,
  password: "",
  code: "" || undefined,
};

export const AuthFormData = atomWithStorage<
  z.infer<typeof AuthenticationSchema>
>("multiStepAuthForm", initialData);

export enum Step {
  StepOne,
  StepTwo, // If Login StepTwo is dynamic, if phone number is chosen, then otp modal shows, if email is chosen, password field comes up else if registration, registration compl;etion modal,
  StepThree, // If Login StepTwo is dynamic, if phone number is chosen, then otp modal shows, if email is chosen, password field comes up else if registration, registration compl;etion modal,
  StepFour,
  StepFive,
  StepSix,
}
type PrevStep = number; // Adjust the type based on your implementation

const firstStep = Step.StepOne;
export const stepperAtomAuthOne = atomWithReset<Step>(firstStep);

export const useStepperAuthOne = () => {
  const [step, setStep] = useAtom(stepperAtomAuthOne);
  const [prevStep, setPrevStep] = useState<PrevStep | null>(null);

  // Update prevStep whenever step changes
  useEffect(() => {
    setPrevStep(step);
  }, [step]);
  function goToNextStep() {
    setStep(step + 1);
  }

  function goToPreviousStep() {
    setStep(step > firstStep ? step - 1 : step);
  }

  function resetStepper() {
    setPrevStep(null); // Reset prevStep when resetting stepper

    setStep(firstStep);
  }

  return {
    step,
    setStep,
    resetStepper,
    goToNextStep,
    goToPreviousStep,
    prevStep,
  };
};

const MAP_STEP_TO_COMPONENT = {
  [Step.StepOne]: ResgisterForm,
  [Step.StepTwo]: RegisterModal,
  [Step.StepThree]: LoginModal,
  [Step.StepFour]: PhoneLoginModal,
  [Step.StepFive]: MoreOptionsOTP,
  [Step.StepSix]: AccountModal,
};

export const stepOneTotalSteps = Object.keys(MAP_STEP_TO_COMPONENT).length;

const MultiStepAuthForm = () => {
  const [step] = useAtom(stepperAtomAuthOne);
  const Component = MAP_STEP_TO_COMPONENT[step];

  return (
    <>
      <div className={cn("")}>
        <Component />
      </div>
    </>
  );
};

export default MultiStepAuthForm;
