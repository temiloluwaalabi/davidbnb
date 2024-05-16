"use client";
import { useAtom } from "jotai/react";
import { AuthFormData, useStepperAuthOne } from "./AuthStepWrapper";
import { useForm } from "react-hook-form";
import { PhoneOTPSchema } from "@/lib/validations";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { formatPhoneNumberInternational } from "@/lib/utils";
import { parsePhoneNumber } from "libphonenumber-js/min";
import { useDialogModalAtom } from "@/lib/atom";
const PhoneLoginForm = () => {
  const [formData, setFormData] = useAtom(AuthFormData);
  const { step, goToNextStep, setStep } = useStepperAuthOne();
  const { otpText } = useDialogModalAtom();

  const form = useForm<z.infer<typeof PhoneOTPSchema>>({
    resolver: zodResolver(PhoneOTPSchema),
    defaultValues: {
      code: "",
    },
  });
  let formattedPhoneNumber;
  if (formData.phone) {
    const phoneNumber = parsePhoneNumber(formData?.phone);
    formattedPhoneNumber = phoneNumber.formatInternational();
  }
  const handleSubmit = async (values: z.infer<typeof PhoneOTPSchema>) => {
    //   console.log(formData);
    //   const emailUser = await getUserByEmail({
    //     email: values.email,
    //   });
  };

  let text;
  if (otpText === "sms") {
    text = `Enter the code we sent over SMS to ${formattedPhoneNumber}`;
  }
  if (otpText === "whatsapp") {
    text = `Enter the code we sent over Whatsapp to ${formattedPhoneNumber}`;
  }
  if (otpText === "call") {
    text = `We'll call you at ${formattedPhoneNumber}. Enter the code below`;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="pt-3 flex flex-col gap-4"
      >
        <p>{text}</p>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <>
              <FormItem className=" ">
                <div className="flex flex-col space-y-0">
                  <FormControl>
                    <div className="flex gap-1 items-center p-0">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      {/* <Input
                        placeholder="Email"
                        type="email"
                        className="border-none text-base font-normal p-0 rounded-none no-focus h-auto "
                        {...field}
                      /> */}
                    </div>
                  </FormControl>
                </div>
              </FormItem>
              <FormMessage />
            </>
          )}
        />

        <div className=" flex justify-between items-center">
          <Button
            variant="link"
            className="p-0 text-sm underline text-secondary-textBlack"
            onClick={() => setStep(4)}
          >
            MORE OPTIONS
          </Button>
          <Button type="submit" className="h-[40px]">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PhoneLoginForm;
