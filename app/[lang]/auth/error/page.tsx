import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const ErrorPage = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn("text-3xl font-semibold", font.className)}>
            🔐Auth
          </h1>
          <p className="text-muted-foreground text-sm">
            Oops! Something went wrong!
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <FaExclamationTriangle className="text-destructive" />
      </CardContent>

      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorPage;
