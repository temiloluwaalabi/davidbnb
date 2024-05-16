"use client";
import { useAtom } from "jotai/react";
import {
  AuthFormData,
  initialData,
  useStepperAuthOne,
} from "./AuthStepWrapper";
import { useForm } from "react-hook-form";
import { EmailLoginSchema } from "@/lib/validations";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useTransition } from "react";
import { LoginByEmail } from "@/actions/authentication";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useDialogModalAtom } from "@/lib/atom";
import { TriangleAlertIcon } from "lucide-react";
import { Locale, i18n } from "@/i18n.config";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getLocalizedUrl } from "@/lib/utils";
const EmailLoginForm = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useAtom(AuthFormData);
  const [error, setError] = useState("");
  const { setStep } = useStepperAuthOne();
  const { setOpenLoginModal } = useDialogModalAtom();
  const router = useRouter();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";
  const [isPending, startTransition] = useTransition();
  const callbackUrl = searchParams.get("redirectTo") ?? DEFAULT_LOGIN_REDIRECT;
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
  const { toast } = useToast();
  const form = useForm<z.infer<typeof EmailLoginSchema>>({
    resolver: zodResolver(EmailLoginSchema),
    defaultValues: {
      email: formData.email || "",
      password: "",
    },
  });
  // if (urlError) {
  //   toast({
  //     title: "Similar Account",
  //     description: "Email already in use with different provider",
  //   });
  // }
  const handleSubmit = async (values: z.infer<typeof EmailLoginSchema>) => {
    setError("");
    startTransition(() => {
      LoginByEmail(values, lang, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            router.push(getLocalizedUrl(callbackUrl, lang as Locale));
            setOpenLoginModal(false);
            toast({
              title: "Logged In Successfully",
              description: data?.success,
            });
            setFormData(initialData);
            form.reset();
            setStep(0);
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong",
          });
        });
    });
    //   console.log(formData);
    //   const emailUser = await getUserByEmail({
    //     email: values.email,
    //   });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="pt-3 flex flex-col gap-4"
      >
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
        {error && (
          <div className="bg-primary/20 rounded-md p-2 flex items-center gap-2">
            <TriangleAlertIcon className="size-5 text-primary" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <Button type="submit" className="mt-2 h-[50px]" disabled={isPending}>
          Continue
        </Button>
        <Link
          href="/auth/forgot_password"
          className="text-xs underline text-primary"
        >
          Forgot Password
        </Link>
      </form>
    </Form>
  );
};

export default EmailLoginForm;
