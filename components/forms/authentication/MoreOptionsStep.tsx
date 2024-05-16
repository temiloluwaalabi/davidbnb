"use client";
import { useAtom } from "jotai/react";
import { AuthFormData, useStepperAuthOne } from "./AuthStepWrapper";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

import { MessageSquare, Phone, TriangleAlertIcon } from "lucide-react";
import { parsePhoneNumber } from "libphonenumber-js/min";
import { Separator } from "@/components/ui/separator";
import { MdWhatsapp } from "react-icons/md";
import { useDialogModalAtom } from "@/lib/atom";
const MoreOptionsStep = () => {
  // const searchParams = useSearchParams();
  const [formData, setFormData] = useAtom(AuthFormData);
  // const [error, setError] = useState("");
  // const { step, goToNextStep, setStep } = useStepperAuthOne();
  // const { setOpenLoginModal, setOpenRegisterModal } = useDialogModalAtom();
  const [showCheckCircle, setShowCheckCircle] = useState(false);
  const [sendWhatsapp, setSendWhatsapp] = useState(false);
  const [makePhoneCall, setMakePhoneCall] = useState(false);
  const { otpText, setOtpText } = useDialogModalAtom();
  const { setStep } = useStepperAuthOne();
  const userRef = useRef(false);
  // const urlError =
  //   searchParams.get("error") === "OAuthAccountNotLinked"
  //     ? "Email already in use with different provider"
  //     : "";
  // const [isPending, startTransition] = useTransition();
  // const callbackUrl = searchParams.get("callbackUrl");
  // const { toast } = useToast();
  // const form = useForm<z.infer<typeof EmailLoginSchema>>({
  //   resolver: zodResolver(EmailLoginSchema),
  //   defaultValues: {
  //     email: formData.email || "",
  //     password: "",
  //   },
  // });
  let formattedPhoneNumber;
  if (formData.phone) {
    const phoneNumber = parsePhoneNumber(formData?.phone);
    formattedPhoneNumber = phoneNumber.formatInternational();
  }

  //   setError("");
  //   startTransition(() => {
  //     LoginByEmail(values, callbackUrl)
  //       .then((data) => {
  //         if (data?.error) {
  //           form.reset();
  //           setError(data.error);
  //         }
  //         if (data?.success) {
  //           form.reset();
  //           toast({
  //             title: "Logged In Successfully",
  //             description: data?.success,
  //           });
  //           setFormData(initialData);
  //           setOpenLoginModal(false);
  //           setStep(0);
  //           form.reset();
  //         }
  //       })
  //       .catch(() => {
  //         toast({
  //           title: "Error",
  //           description: "Something went wrong",
  //         });
  //       });
  //   });
  //   //   console.log(formData);
  //   //   const emailUser = await getUserByEmail({
  //   //     email: values.email,
  //   //   });
  // };
  const handleSubmit = () => {
    if (showCheckCircle === true) {
      setOtpText("sms");
    }
    if (makePhoneCall === true) {
      setOtpText("call");
    }
    if (sendWhatsapp === true) {
      setOtpText("whatsapp");
    }
    setStep(3);
  };
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-base">
          Choose another way to get a verification code at{" "}
          {formattedPhoneNumber}
        </p>
        <span className="text-xs text-secondary-text">
          Make sure your notifications are turned on.
        </span>
      </div>
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => {
          setShowCheckCircle((prev) => !prev);
          setSendWhatsapp(false);
          setMakePhoneCall(false);
        }}
      >
        <MessageSquare className="size-6" />
        <div className="flex flex-col">
          <h6 className="text-base font-bold">Text message (SMS)</h6>
          <p className="text-sm mt-[-2px]">We&apos;ll text you a code</p>
        </div>
        <div className="relative ml-auto cursor-pointer">
          <div
            className={`size-6 rounded-full cursor-pointer ${
              showCheckCircle ? "bg-black" : "bg-transparent border "
            }`}
          />

          <div className="size-2 bg-white rounded-full absolute top-0 translate-x-[100%] translate-y-[100%]" />
        </div>
      </div>
      <Separator />
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => {
          setSendWhatsapp((prev) => !prev);
          setShowCheckCircle(false);
          setMakePhoneCall(false);
        }}
      >
        <MdWhatsapp className="size-6" />
        <div className="flex flex-col">
          <h6 className="text-base font-bold">WhatsApp</h6>
          <p className="text-sm mt-[-2px]">We&apos;ll send a code over wifi</p>
        </div>
        <div className="relative ml-auto cursor-pointer">
          <div
            className={`size-6 rounded-full cursor-pointer ${
              sendWhatsapp ? "bg-black" : "bg-transparent border "
            }`}
          />

          <div className="size-2 bg-white rounded-full absolute top-0 translate-x-[100%] translate-y-[100%]" />
        </div>
      </div>
      <Separator />
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => {
          setMakePhoneCall((prev) => !prev);
          setSendWhatsapp(false);
          setShowCheckCircle(false);
        }}
      >
        <Phone className="size-6" />
        <div className="flex flex-col">
          <h6 className="text-base font-bold">Phone call</h6>
          <p className="text-sm mt-[-2px]">We&apos;ll call you with a code</p>
        </div>
        <div className="relative ml-auto cursor-pointer">
          <div
            className={`size-6 rounded-full cursor-pointer ${
              makePhoneCall ? "bg-black" : "bg-transparent border "
            }`}
          />

          <div className="size-2 bg-white rounded-full absolute top-0 translate-x-[100%] translate-y-[100%]" />
        </div>
      </div>
      <Separator />
      <Button type="button" onClick={handleSubmit} className="bg-black">
        Resend Code
      </Button>
    </div>
  );
};

export default MoreOptionsStep;
