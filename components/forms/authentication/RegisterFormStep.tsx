"use client";
import { useAtom } from "jotai/react";
import {
  AuthFormData,
  initialData,
  stepperAtomAuthOne,
  useStepperAuthOne,
} from "./AuthStepWrapper";
import { useForm } from "react-hook-form";
import { RegistrationSchema } from "@/lib/validations";
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
import { Separator } from "@/components/ui/separator";
import { FieldError } from "@/components/shared/field-error";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Calendar as Cal,
  TriangleAlert,
  TriangleAlertIcon,
} from "lucide-react";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { useToast } from "@/components/ui/use-toast";
import { useResetAtom } from "jotai/utils";
import { useDialogModalAtom } from "@/lib/atom";
import error from "next/error";
const RegistrationForm = () => {
  const resetLocation = useResetAtom(stepperAtomAuthOne);
  const [date, setDate] = useState(false);
  const [formData, setFormData] = useAtom(AuthFormData);
  const { step, goToNextStep, setStep } = useStepperAuthOne();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { toast } = useToast();
  const { setOpenLoginModal } = useDialogModalAtom();
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      dob: formData.dob,
      email: formData.email || "",
      password: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof RegistrationSchema>) => {
    //   console.log(formData);
    //   const emailUser = await getUserByEmail({
    //     email: values.email,
    //   });
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.error) {
          setError(data?.error);
        }
        if (data?.success) {
          toast({
            title: "Registered Successfully",
            description: data?.success,
          });
          setFormData(initialData);
          setOpenLoginModal(false);
          setStep(0);
          form.reset();
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="pt-3 flex flex-col gap-2"
      >
        <>
          <div className=" border rounded-[8px] border-secondary-text">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col px-3 py-1.5 space-y-0 ">
                  <FormLabel className="text-xs text-secondary-text font-light">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1 items-center p-0">
                      <Input
                        disabled={isPending}
                        placeholder="First Name"
                        type="text"
                        className="border-none text-base font-normal p-0 rounded-none no-focus h-auto "
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className="bg-secondary-text" />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col  px-3 py-1.5  space-y-0 ">
                  <FormLabel className="text-xs text-secondary-text font-light">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1 items-center p-0">
                      <Input
                        disabled={isPending}
                        placeholder="Last Name"
                        type="text"
                        className="border-none text-base font-normal p-0 rounded-none no-focus h-auto "
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FieldError message={form.formState.errors.lastName?.message} />
          </div>
          <FormDescription className="text-xs mb-4">
            Make sure it matches the name on your government ID
          </FormDescription>
        </>
        <>
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <>
                <FormItem className="border rounded-[8px] border-secondary-text ">
                  <div className="flex flex-col  px-3 py-1.5  space-y-0">
                    {/* <FormLabel className="text-xs text-secondary-text font-light">
                      Date of birth
                    </FormLabel> */}
                    <FormControl>
                      <Popover open={date} onOpenChange={setDate}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isPending}
                              variant="outline"
                              className="border-none bg-white hover:bg-transparent flex w-full text-base font-normal p-0 rounded-none no-focus cursor-pointer h-[35px] items-center"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span className="text-secondary-text ">
                                  Birthdate
                                </span>
                              )}
                              <Cal className="ml-auto size-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                          alignOffset={3}
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </div>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <FormDescription className="text-xs mb-4">
            To sign up, you need to be at least 18. Your birthday won&apos;t be
            shared with other people who use Airbnb
          </FormDescription>
        </>
        <>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem className="border rounded-[8px] border-secondary-text ">
                  <div className="flex flex-col  px-3 py-1.5  space-y-0">
                    <FormLabel className="text-xs text-secondary-text font-light">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1 items-center p-0">
                        <Input
                          disabled={isPending}
                          placeholder="Email"
                          type="email"
                          className="border-none text-base font-normal p-0 rounded-none no-focus h-auto "
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <FormDescription className="text-xs mb-4">
            We&apos;ll email you trip confirmations and receipts
          </FormDescription>
        </>
        <>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem className="border rounded-[8px] border-secondary-text ">
                  <div className="flex flex-col  px-3 py-1.5  space-y-0">
                    <FormLabel className="text-xs text-secondary-text font-light">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1 items-center p-0">
                        <Input
                          disabled={isPending}
                          placeholder="Password"
                          type="password"
                          autoComplete="true"
                          className="border-none text-base font-normal p-0 rounded-none no-focus h-auto "
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <FormDescription className="text-xs mb-2">
            By Selecting Agree and continue, I agree to Airbnb&apos;s Terms of
            Service, Payments Terms of Services, and Nondiscrimination Policy,
            and acknowledge the Privacy Policy
          </FormDescription>
        </>
        {error && (
          <div className="bg-primary/20 rounded-md p-2 flex items-center gap-2">
            <TriangleAlertIcon className="size-5 text-primary" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <Button type="submit" className="mt-2 h-[50px]" disabled={isPending}>
          Agree and continue
        </Button>
        <div>
          <Separator className="my-4 bg-secondary-borderB" />
          <span className="text-xs text-secondary-text/80">
            Airbnb will send you members only deals, inspiration, marketing
            emails, and push notifications. You can opt out of receiving these
            at any time in your account settings or directly from the marketing
            notification.
          </span>

          <FormField
            control={form.control}
            name="marketingMessage"
            render={({ field }) => (
              <FormItem className="mt-3 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs text-secondary-text font-light">
                    I don&apos;t want to receive marketing messages from Airbnb.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
