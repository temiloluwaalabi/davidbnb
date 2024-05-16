"use client";
import React, { useState } from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { CircleUserRound, Globe2, Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { SafeUser } from "@/types";
import { Logout } from "@/actions/logout";
import Link from "next/link";
interface NavbarProps {
  user?: SafeUser | null | undefined;
}
const MobileNavbar: React.FC<NavbarProps> = ({ user }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <nav className="bg-white shadow-sm relative z-10 w-full pt-3">
      <MaxWidthContainer classnames="border-b-[1px]">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-3 relative">
            <div className="flex items-center gap-1 mr-2">
              <Button
                className="btn-semibold transition-color rounded-full hover:bg-[#f7f7f7] text-[#222222]"
                variant="ghost"
              >
                Airbnb your home
              </Button>
              <Globe2 className="size-5" />
            </div>
            <div className="relative">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild className="cursor-pointer">
                  <div
                    className={`flex items-center gap-5 px-2 py-3 border rounded-3xl ${
                      isPopoverOpen ? "shadow-light-200" : ""
                    }`}
                    // onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  >
                    <Menu className="size-5" />
                    <CircleUserRound className="size-5" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="translate-x-[-1.25rem] xl:translate-x-[-4rem] bg-white border-none  mt-2 flex flex-col items-start p-0 py-3 gap-1">
                  {user ? (
                    <div className=" w-full">
                      <div className="flex flex-col gap-1 w-full pt-2">
                        <Link
                          className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                          href="/messages"
                        >
                          Messages
                        </Link>
                        <Link
                          className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                          href="/notifications"
                        >
                          Notifications
                        </Link>
                        <Link
                          className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                          href="/trip"
                        >
                          Trips
                        </Link>
                        <Link
                          className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                          href="/wishlist"
                        >
                          Wishlist
                        </Link>
                      </div>
                      <Separator />
                      <div className="flex flex-col gap-1 w-full pt-2">
                        <Link
                          className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                          href="/host/homes"
                        >
                          Airbnb your home
                        </Link>
                        <Link
                          className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                          href="/account-settings"
                        >
                          Account
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 w-full pt-2">
                      <Link
                        className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                        href="/auth/login"
                      >
                        Log In
                      </Link>
                      <Link
                        className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                        href="/auth/login"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}

                  {/* <Dialog
                      open={openRegisterModal}
                      onOpenChange={setOpenRegisterModal}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          aria-label="Register"
                          className="bg-transparent no-focus text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start px-3.5 rounded-none"
                        >
                          Sign Up
                        </Button>
                      </DialogTrigger>
                      <DialogContent className=" border-none p-0 py-3">
                        <RegisterModal />
                      </DialogContent>
                    </Dialog> */}
                  <Separator />

                  <div className="flex flex-col gap-1 w-full pt-2">
                    <Link
                      className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                      href="/giftcards"
                    >
                      Giftcards
                    </Link>
                    <Link
                      className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                      href="/host/homes"
                    >
                      Airbnb your home
                    </Link>
                    <Link
                      className="bg-transparent text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start py-2 px-3.5 rounded-none"
                      href="/help"
                    >
                      Help Center
                    </Link>
                    {user && (
                      <Button
                        variant="destructive"
                        className="cursor-pointer mx-3 mt-3"
                        onClick={() => Logout()}
                      >
                        Log Out
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </MaxWidthContainer>
    </nav>
  );
};

export default MobileNavbar;
