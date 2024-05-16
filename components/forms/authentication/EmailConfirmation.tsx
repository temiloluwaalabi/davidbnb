"use client";
import { EmailVerification } from "@/actions/authentication";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, TriangleAlertIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const ConfirmEmail = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const userRef = useRef(false);

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token");
      return;
    }

    EmailVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    if (userRef.current === false) {
      onSubmit();
    }
    return () => {
      userRef.current = true;
    };
  }, [onSubmit]);
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn("text-xl font-semibold", font.className)}>
            Confirming your verification
          </h1>
          {/* <p className="text-muted-foreground text-sm">
            Oops! Something went wrong!
          </p> */}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 items-center justify-center">
        <BeatLoader />
        {!success && error && (
          <div className="bg-primary/20 rounded-md p-2 flex items-center gap-2">
            <TriangleAlertIcon className="size-5 text-primary" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircleIcon className="h-4 w-4" />

            <p className="text-sm">{success}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConfirmEmail;
