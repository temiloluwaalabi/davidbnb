"use client";
import { EmailSchema, PhoneSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { countriesWithCodes } from "@/lib/countries-with-code";
import { CheckIcon, ChevronsUpDown, GithubIcon } from "lucide-react";
import { stringUtils } from "@/lib/string-utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { cn, getLocalizedUrl } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { AsYouType, parsePhoneNumber } from "libphonenumber-js/min";
import { FieldError } from "../../shared/field-error";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import AuthStepFooter from "./PhoneLoginForm";
import {
  getAccountByUserId,
  getUserByEmail,
  getUserByPhone,
} from "@/actions/user.actions";
import { AuthFormData, useStepperAuthOne } from "./AuthStepWrapper";
import { useAtom } from "jotai/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDialogModalAtom } from "@/lib/atom";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useParams, useSearchParams } from "next/navigation";
import { Locale, i18n } from "@/i18n.config";
import { useToast } from "@/components/ui/use-toast";

export type ComboboxOption = {
  value: string;
  label: string;
};

export const EmailForm = () => {
  const [formData, setFormData] = useAtom(AuthFormData);
  const { step, goToNextStep, setStep } = useStepperAuthOne();
  const [isPending, startTranstion] = useTransition();

  const emailForm = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: formData.email || "",
    },
  });
  const handleSubmit = (values: z.infer<typeof EmailSchema>) => {
    startTranstion(async () => {
      setFormData((prev) => ({
        ...prev,
        email: values.email,
      }));
      const emailUser = await getUserByEmail(values.email);
      const accountExists = await getAccountByUserId(emailUser?.id as string);
      console.log(accountExists);

      if (!emailUser) {
        setStep(1);
      } else {
        if (accountExists) {
          setStep(5);
        } else {
          setStep(2);
        }
      }
    });
  };

  return (
    <Form {...emailForm}>
      <form
        onSubmit={emailForm.handleSubmit(handleSubmit)}
        className="pt-3 flex flex-col gap-2 w-full"
      >
        <div className=" ">
          <FormField
            control={emailForm.control}
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
        </div>
        <Button type="submit" className="mt-4 h-[50px]" disabled={isPending}>
          Continue
        </Button>
      </form>
    </Form>
  );
};

export const PhoneForm = () => {
  const [isPending, startTranstion] = useTransition();
  const [formData, setFormData] = useAtom(AuthFormData);
  const { step, goToNextStep, setStep } = useStepperAuthOne();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { setOtpText } = useDialogModalAtom();
  let formattedPhoneNumber;
  if (formData.phone) {
    const phoneNumber = parsePhoneNumber(formData?.phone);
    formattedPhoneNumber = phoneNumber.formatNational();
  }
  const phoneForm = useForm<z.infer<typeof PhoneSchema>>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: {
      phone: {
        phone: "",
        countryCode: formData?.countryCode ?? countriesWithCodes[0].code_2,
      },
    },
  });
  const selectedCountryCode = phoneForm.watch("phone.countryCode");
  const typedPhoneNumber = phoneForm.watch("phone");
  const selectedCountryInfo = useMemo(() => {
    const countryCode = selectedCountryCode ?? ""; // Provide a default value if selectedCountryCode is undefined

    return (
      countriesWithCodes.find(
        (country) =>
          stringUtils.normalize(country.code_2) ===
          stringUtils.normalize(countryCode)
      ) ?? countriesWithCodes[0]
    );
  }, [selectedCountryCode]);

  const selectedCountryOption: ComboboxOption = {
    label: `${selectedCountryInfo?.name_en} (${selectedCountryInfo?.dial_code})`,
    value: selectedCountryInfo?.code_2,
  };

  const countryOptions: ComboboxOption[] = useMemo(() => {
    return countriesWithCodes
      .sort((a, b) => a.name_en.localeCompare(b.name_en))
      .map((item) => ({
        label: `${item.emoji} ${item.name_en} (${item.dial_code})`,
        value: item.code_2,
      }));
  }, []);

  const handleSubmit = async (values: z.infer<typeof PhoneSchema>) => {
    console.log(formData);
    const formattedPhoneNumber = values.phone.phone;
    startTranstion(() => {
      // TODO: do frontend number check.
      setFormData((prev) => ({
        ...prev,
        phone: formattedPhoneNumber,
        countryCode: values.phone.countryCode,
      }));
    });
    console.log({ ...values, phone: formattedPhoneNumber });
    setOtpText("sms");
    setStep(3);
  };

  const filter = (value: string, search: string): Boolean => {
    const currentCountry = countriesWithCodes.find(
      (country) =>
        stringUtils.normalize(country.code_2) === stringUtils.normalize(value)
    );
    return currentCountry !== undefined
      ? currentCountry.name_en.toLowerCase().includes(search.toLowerCase())
      : false;
  };
  return (
    <Form {...phoneForm}>
      <form
        onSubmit={phoneForm.handleSubmit(handleSubmit)}
        className="pt-3 flex flex-col gap-2"
      >
        <>
          <div className=" border rounded-[8px] border-secondary-text">
            <FormField
              control={phoneForm.control}
              name="phone.countryCode"
              render={({ field }) => (
                <FormItem className="flex flex-col px-3 py-1.5 space-y-0 ">
                  <FormLabel className="text-xs text-secondary-text font-light">
                    Country Code
                  </FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          //   variant="outline"
                          //   role="combobox"
                          aria-expanded={open}
                          disabled={isPending}
                          className="w-full p-0 h-auto no-focus focus-within:none focus:none focus-visible:none peer-focus:none  flex items-center cursor-pointer border-none hover:px-2.5 hover:bg-transparent transition-all text-base font-normal  justify-between "
                          title="Select Country"
                        >
                          {/* {field.value
                      ? countryOptions.find(
                          (country) => country.value === field.value
                        )?.label
                      : "Select a Country"} */}
                          {selectedCountryOption?.label ?? "Select a Country"}
                          <ChevronsUpDown className="ml-1 size-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0  w-full xl:w-[400px]"
                        id="CountryCode"
                        aria-label="Pick your country code"
                      >
                        <Command
                          defaultValue={selectedCountryOption.value}
                          filter={
                            filter !== undefined
                              ? (value, search) =>
                                  filter(value, search) ? 1 : 0
                              : undefined
                          }
                        >
                          <CommandInput placeholder="Search for a country" />
                          <CommandEmpty>No countries found</CommandEmpty>
                          <CommandList className="custom-scrollbar">
                            {countryOptions.map((option) => (
                              <CommandItem
                                className="cursor-pointer"
                                value={option.value}
                                key={option.value}
                                onSelect={(value) => {
                                  const newCountry = countriesWithCodes.find(
                                    (item) =>
                                      stringUtils.normalize(item.code_2) ===
                                      stringUtils.normalize(value)
                                  );
                                  if (newCountry !== undefined) {
                                    phoneForm.setValue(
                                      "phone.countryCode",
                                      newCountry.code_2
                                    );
                                    setOpen(false);
                                  }
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 size-4",
                                    option.value === selectedCountryOption.value
                                      ? "text-primary"
                                      : "text-secondary-textBlack"
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className="bg-secondary-text" />
            <FormField
              control={phoneForm.control}
              name="phone.phone"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-col relative  px-3 py-1.5  space-y-0 ">
                    <FormLabel className="text-xs text-secondary-text font-light">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1 items-center p-0 ">
                        <span className="text-base p-0 font-normal">
                          {selectedCountryInfo.dial_code}
                        </span>

                        <Input
                          placeholder={selectedCountryInfo?.placeholder}
                          value={field.value}
                          disabled={isPending}
                          onChange={(e) => {
                            let newValue = e.target.value;
                            const newFormattedValue = new AsYouType(
                              selectedCountryInfo?.code_2
                            ).input(newValue);
                            if (
                              field.value !== undefined &&
                              newValue.length < field.value.length &&
                              newFormattedValue === field.value
                            ) {
                              newValue = newValue.slice(0, -1);
                            }
                            field.onChange(
                              new AsYouType(selectedCountryInfo?.code_2).input(
                                newValue
                              )
                            );
                          }}
                          type="tel"
                          className="border-none  text-base font-normal p-0 rounded-none no-focus h-auto "
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                  <FormMessage className="absolute top-0" />
                </>
              )}
            />
          </div>
          <FormDescription className="text-xs">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </FormDescription>
        </>

        {/* <AuthStepFooter email={}  /> */}
        <Button type="submit" className="mt-4 h-[50px]" disabled={isPending}>
          Continue
        </Button>
      </form>
    </Form>
  );
};

const ResgisterForm = () => {
  const { step, goToNextStep, setStep } = useStepperAuthOne();
  const [showEmail, setShowEmail] = useState(false);
  const [formData, setFormData] = useAtom(AuthFormData);
  const { toast } = useToast();
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
    if (urlError) {
      toast({
        description: "Email already in use with different provide",
      });
    }
  };
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  return (
    <Card className=" border-none shadow-none no-focus ">
      <CardHeader className="shadow-none border-b border-b-borderB p-0 py-3">
        <CardTitle className="text-base text-ellipsis font-bold text-center">
          Log in or sign up
        </CardTitle>
      </CardHeader>
      <CardContent className="relative overflow-y-auto custom-scrollbar px-4 pt-6 ">
        <h2 className="mb-2 text-[1.375rem] leading-[1.625rem] font-semibold text-secondary-textBlack">
          Welcome to Airbnb
        </h2>
        <div className="">{showEmail ? <EmailForm /> : <PhoneForm />}</div>
        <div>
          <div className="relative py-6">
            <Separator className=" bg-secondary-borderB" decorative />
            <span className="absolute top-0 right-[50%] translate-y-[60%] translate-x-[0%] w-auto bg-white text-sm px-2">
              or
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="h-[48px] rounded-[8px] shadow-none no-focus text-sm font-medium flex items-center justify-start outline-none w-full border border-secondary-textBlack"
              onClick={() => handleClick("github")}
            >
              <FaGithub className="size-6 mr-[30%] text-blue-800" />
              Continue with Github
            </Button>
            <Button
              variant="outline"
              className="h-[48px] rounded-[8px] shadow-none no-focus text-sm font-medium flex items-center justify-start outline-none w-full border border-secondary-textBlack"
              onClick={() => handleClick("google")}
            >
              <FcGoogle className="size-6 mr-[30%] text-blue-800" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="h-[48px] rounded-[8px] shadow-none no-focus text-sm font-medium flex items-center justify-start outline-none w-full border border-secondary-textBlack"
              onClick={() => handleClick("apple")}
            >
              <FaApple className="size-6 mr-[30%] text-black" />
              Continue with Apple
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEmail((prev) => !prev)}
              className="h-[48px] rounded-[8px] shadow-none no-focus text-sm font-medium flex items-center justify-start outline-none w-full border border-secondary-textBlack"
            >
              {!showEmail && (
                <>
                  <CiMail className="size-6 mr-[30%] text-black" />
                  Continue with Mail
                </>
              )}
              {showEmail && (
                <>
                  <IoPhonePortraitOutline className="size-6 mr-[30%] text-black" />
                  Continue With Phone
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResgisterForm;
