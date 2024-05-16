"use client";
import {
  CircleUserRound,
  Dot,
  Globe2,
  Menu,
  Search,
  SlidersHorizontalIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import MaxWidthContainer from "./MaxWidthContainer";
import StayForm from "../forms/StayForm";
import { useEffect, useState } from "react";
import { cn, getLocalizedUrl } from "@/lib/utils";
import { categories } from "@/constants/main";
import CategoryBox from "./CategoryBox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import FilterModal from "../modals/FilterModal";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import Link from "next/link";
import RegisterModal from "../modals/AuthenticationModal";
import { dialogAtom, useDialogModalAtom } from "@/lib/atom";
import { sendOtp } from "@/actions/sms";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SafeUser } from "@/types";
import { User } from "@prisma/client";
import { Logout } from "@/actions/logout";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Locale, i18n } from "@/i18n.config";
import { useToast } from "../ui/use-toast";
interface NavbarProps {
  user?: SafeUser | null | undefined;
}
const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const session = useSession();
  const userClient = useCurrentUser();
  const [stays, setStays] = useState(true);
  const [experiences, setExperiences] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { openLoginModal, setOpenLoginModal } = useDialogModalAtom();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
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
  // useEffect(() => {
  //   sendOtp();
  // });

  const handleUserLogout = async () => {
    try {
      await signOut({ redirect: false });

      router.push(getLocalizedUrl("/auth/login", lang as Locale));
      toast({
        description: "Logged Out successfully!",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="bg-white shadow-sm relative z-10 w-full pt-3">
      <MaxWidthContainer classnames="border-b-[1px]">
        <div className="flex md:hidden items-center gap-4 justify-between">
          <div className="h-[56px] flex-1 rounded-[32px] gap-4 shadow-light-100 items-center flex p-5">
            <Search className="size-6 text-secondary-textBlack" />
            <div className="flex flex-col mt-2">
              <h6 className="text-sm font-semibold text-secondary-textBlack">
                Anywhere
              </h6>
              <p className="flex text-xs items-center text-secondary-text font-normal">
                Any week <Dot /> Add guests
              </p>
            </div>
          </div>
          <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
            <DrawerTrigger asChild>
              <div className="size-10 rounded-full border border-[#b0b0b0] bg-transparent flex items-center justify-center cursor-pointer">
                <SlidersHorizontalIcon className="size-5 font-bold text-secondary-textBlack" />
              </div>
            </DrawerTrigger>
            <DrawerContent className="bg-white h-[95%] border-none shadow-none">
              <FilterModal />
            </DrawerContent>
          </Drawer>
        </div>
        <div className="hidden md:flex flex-col gap-4  relative">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="hidden lg:flex">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className={cn(
                    "text-base font-normal leading-6 transition-color rounded-full hover:bg-[#f7f7f7] text-[#222222]",
                    stays === true && "font-bold"
                  )}
                  onClick={() => {
                    setExperiences(false);
                    setStays(true);
                  }}
                >
                  Stays
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-base font-normal leading-6 transition-color rounded-full hover:bg-[#f7f7f7] text-[#222222]",
                    experiences === true && "font-bold"
                  )}
                  onClick={() => {
                    setStays(false);
                    setExperiences(true);
                  }}
                >
                  Experiences
                </Button>
                <Button
                  variant="ghost"
                  className="text-base font-normal leading-6 transition-color rounded-full hover:bg-[#f7f7f7] text-[#222222]"
                >
                  Online Experiences
                </Button>
              </div>
            </div>
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
                      className={`flex items-center gap-5 px-2 py-1 border rounded-3xl ${
                        isPopoverOpen ? "shadow-light-200" : ""
                      }`}
                      // onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      <Menu className="size-5" />
                      <Avatar className="">
                        <AvatarFallback className="bg-transparent p-0">
                          <CircleUserRound className="size-5" />
                        </AvatarFallback>
                        {session.data?.user.image && (
                          <AvatarImage
                            src={session.data.user.image as string}
                          />
                        )}
                      </Avatar>
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
                      <Dialog
                        open={openLoginModal}
                        onOpenChange={setOpenLoginModal}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            aria-label="Login"
                            className="bg-transparent no-focus text-sm font-normal hover:font-medium transition hover:bg-[#f7f7f7] p-0 w-full flex items-center justify-start px-3.5 rounded-none"
                          >
                            Log In / Sign Up
                          </Button>
                        </DialogTrigger>
                        <DialogContent className=" border-none p-0 py-3">
                          <div className="">
                            <RegisterModal />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
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
          <div className="items-center justify-center pb-2 hidden lg:flex">
            <div className="w-full lg:w-[85%] 2xl:w-[60%]">
              {stays && <StayForm />}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 lg:hidden pb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className={cn(
                  "text-base font-normal leading-6 transition-color rounded-full hover:bg-[#f7f7f7] text-[#222222]",
                  stays === true && "font-bold"
                )}
                onClick={() => {
                  setExperiences(false);
                  setStays(true);
                }}
              >
                Stays
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "text-base font-normal leading-6 transition-color rounded-full hover:bg-[#f7f7f7] text-[#222222]",
                  experiences === true && "font-bold"
                )}
                onClick={() => {
                  setStays(false);
                  setExperiences(true);
                }}
              >
                Experiences
              </Button>
              <Button
                variant="ghost"
                className="text-base font-normal leading-6 transition-color rounded-full hover:bg-[#f7f7f7] text-[#222222]"
              >
                Online Experiences
              </Button>
            </div>
            <div className="w-full">{stays && <StayForm />}</div>
          </div>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer classnames="flex items-center justify-between">
        <Carousel className="w-full md:w-[80%] mmd:w-[84%] lg:w-[85%] xl:w-[90%]">
          <CarouselContent className="-ml-4">
            {categories.map((category, i) => (
              <CarouselItem key={`${category.label} - ${i}`} className="pl-1">
                <CategoryBox
                  label={category.label}
                  icon={category.icon}
                  // selected={category === category.label}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="">
            <CarouselPrevious className="hidden md:flex left-0 translate-x-[-100%] md:translate-x-[-20%] xl:translate-x-[-100%]" />
            <CarouselNext className="hidden md:flex right-0 translate-x-[100%]" />
          </div>
        </Carousel>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="hidden md:flex" variant="outline">
              <SlidersHorizontalIcon className="size-4 text-secondary-textBlack" />
              <span className="text-secondary-textBlack text-xs">Filters</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-[688px] lg:max-w-[780px]">
            <FilterModal />
          </DialogContent>
        </Dialog>

        {/* <Button className="hidden md:flex" variant="outline">
          <SlidersHorizontalIcon className="size-4 text-secondary-textBlack" />
          <span className="text-secondary-textBlack text-xs">Filters</span>
        </Button> */}
      </MaxWidthContainer>
    </nav>
  );
};

export default Navbar;
