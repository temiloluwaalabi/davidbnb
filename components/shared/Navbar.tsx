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
import { useState } from "react";
import { cn } from "@/lib/utils";
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

const Navbar = () => {
  const [stays, setStays] = useState(true);
  const [experiences, setExperiences] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <nav className="bg-white shadow-sm fixed z-10 w-full pt-3">
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
        <div className="hidden md:flex flex-col gap-4">
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
            <div className="flex items-center gap-3 ">
              <div className="flex items-center gap-1 mr-2">
                <Button
                  className="btn-semibold transition-color rounded-full hover:bg-[#f7f7f7] text-[#222222]"
                  variant="ghost"
                >
                  Airbnb your home
                </Button>
                <Globe2 className="size-5" />
              </div>
              <div className="flex items-center gap-5 px-2 py-3 border rounded-3xl">
                <Menu className="size-5" />
                <CircleUserRound className="size-5" />
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
            {categories.map((category) => (
              <CarouselItem key={category.label} className="pl-1">
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
