"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import * as z from "zod";
import { FilterScehma } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Minus, Plus, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const StayForm = () => {
  const [destinations, setDestinations] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });
  const form = useForm<z.infer<typeof FilterScehma>>({
    resolver: zodResolver(FilterScehma),
  });

  const handleSubmit = async (values: z.infer<typeof FilterScehma>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="bg-white relative border border-[#dddddd] rounded-[32px] shadow-light-100  flex flex-col items-center md:grid md:grid-cols-12 gap-4">
          <div className="flex col-span-4 ">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <div className=" w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormItem className="bg-transparent flex flex-col space-y-1 px-[32px] border-r rounded-l-[32px]">
                        <FormLabel className="leading-4 text-xs font-semibold">
                          Where
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="search"
                            placeholder="Search destinations"
                            autoComplete="off"
                            aria-autocomplete="none"
                            autoCorrect="off"
                            spellCheck="false"
                            className="btn-semibold p-0 bg-transparent no-focus placeholder:font-normal text-sm w-full h-5 mt-[-10px] border-none"
                          />
                        </FormControl>
                      </FormItem>
                    </PopoverTrigger>
                    <PopoverContent className="mt-5 xl:ml-[15%] w-full lg:w-[450px] rounded-[20px] px-[32px] shadow-box">
                      <h6 className="btn-bold">Search by region</h6>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
          </div>
          <div className="flex col-span-4 ">
            <div>
              <Popover>
                <PopoverTrigger className="" asChild>
                  <div className="flex items-center gap-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="bg-transparent flex flex-col space-y-1 px-[32px] border-r rounded-l-[32px]">
                            <FormLabel className="leading-4 text-xs font-semibold">
                              Check In
                            </FormLabel>
                            <FormControl></FormControl>
                            <Input
                              {...field}
                              type="text"
                              value={
                                date?.from
                                  ? format(date.from, "LLL dd")
                                  : "Add Dates"
                              }
                              autoComplete="off"
                              aria-autocomplete="none"
                              autoCorrect="off"
                              spellCheck="false"
                              className=" bg-transparent p-0 no-focus placeholder:font-normal text-sm font-semibold text-secondary-textBlack w-full h-5 mt-[-10px] border-none"
                            />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="bg-transparent flex flex-col space-y-1 px-[32px] border-r rounded-l-[32px]">
                            <FormLabel className="leading-4 text-xs font-semibold">
                              Check Out
                            </FormLabel>
                            <FormControl></FormControl>
                            <Input
                              {...field}
                              type="text"
                              value={
                                date?.to
                                  ? format(date.to, "LLL dd")
                                  : "Add Dates"
                              }
                              autoComplete="off"
                              aria-autocomplete="none"
                              autoCorrect="off"
                              spellCheck="false"
                              className="font-semibold text-secondary-textBlack bg-transparent p-0 no-focus placeholder:font-normal text-sm w-full h-5 mt-[-10px] border-none"
                            />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full p-0 mt-5 rounded-[32px]"
                  align="start"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex col-span-4 items-center pr-4 ">
            <div className="w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <FormItem className="bg-white flex flex-col space-y-1 py-[14px] px-[32px] rounded-[32px]">
                    <FormLabel className="leading-4 text-xs font-semibold">
                      Who
                    </FormLabel>
                    <h6 className="btn-normal cursor-pointer bg-transparent no-focus  text-sm w-full h-5 mt-[-10px] border-none">
                      Add Guest
                    </h6>
                  </FormItem>
                </PopoverTrigger>
                <PopoverContent className="mt-3 rounded-[20px] w-full lg:w-[400px] px-[32px] shadow-box">
                  <div className="flex flex-col space-y-5">
                    <FormField
                      control={form.control}
                      name="guests.adults"
                      render={({ field }) => (
                        <FormItem className="bg-white flex justify-between">
                          <div className="flex flex-col gap-1">
                            <h5 className="text-base font-bold text-[#222222]">
                              Adults
                            </h5>
                            <p className="text-sm font-normal text-[#717171]">
                              Ages 13 or above
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              className="no-focus size-8 rounded-full border flex items-center justify-center text-black p-[5px]"
                              variant="ghost"
                            >
                              <Minus className="" />
                            </Button>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                defaultValue={1}
                                autoComplete="off"
                                aria-autocomplete="none"
                                autoCorrect="off"
                                className="btn-semibold text-center bg-transparent text-black w-10 flex  no-focus text-sm border-none"
                              />
                            </FormControl>
                            <Button
                              className="no-focus size-8 rounded-full border flex items-center justify-center text-black p-[5px]"
                              variant="ghost"
                            >
                              <Plus className="" />
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={form.control}
                      name="guests.children"
                      render={({ field }) => (
                        <FormItem className="bg-white flex justify-between">
                          <div className="flex flex-col gap-1">
                            <h5 className="text-base font-bold text-[#222222]">
                              Children
                            </h5>
                            <p className="text-sm font-normal text-[#717171]">
                              Ages 2-12
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              className="no-focus size-8 rounded-full border flex items-center justify-center text-black p-[5px]"
                              variant="ghost"
                            >
                              <Minus className="" />
                            </Button>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                defaultValue={0}
                                autoComplete="off"
                                aria-autocomplete="none"
                                autoCorrect="off"
                                className="btn-semibold text-center bg-transparent text-black w-10 flex  no-focus text-sm border-none"
                              />
                            </FormControl>
                            <Button
                              className="no-focus size-8 rounded-full border flex items-center justify-center text-black p-[5px]"
                              variant="ghost"
                            >
                              <Plus className="" />
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={form.control}
                      name="guests.infants"
                      render={({ field }) => (
                        <FormItem className="bg-white flex justify-between">
                          <div className="flex flex-col gap-1">
                            <h5 className="text-base font-bold text-[#222222]">
                              Infants
                            </h5>
                            <p className="text-sm font-normal text-[#717171]">
                              Under 2
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              className="no-focus size-8 rounded-full border flex items-center justify-center text-black p-[5px]"
                              variant="ghost"
                            >
                              <Minus className="" />
                            </Button>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                defaultValue={0}
                                autoComplete="off"
                                aria-autocomplete="none"
                                autoCorrect="off"
                                className="btn-semibold text-center bg-transparent text-black w-10 flex  no-focus text-sm border-none"
                              />
                            </FormControl>
                            <Button
                              className="no-focus size-8 rounded-full border flex items-center justify-center text-black p-[5px]"
                              variant="ghost"
                            >
                              <Plus className="" />
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={form.control}
                      name="guests.pets"
                      render={({ field }) => (
                        <FormItem className="bg-white flex justify-between">
                          <div className="flex flex-col gap-1">
                            <h5 className="text-base font-bold text-[#222222]">
                              Pets
                            </h5>
                            <Dialog>
                              <DialogTrigger>
                                <p className="text-sm font-normal underline text-[#717171]">
                                  Bringing a service animal?
                                </p>
                              </DialogTrigger>
                              <DialogContent className="md:max-w-[568px]">
                                <h4 className="text-2xl font-semibold text-[#222222]">
                                  Service animals
                                </h4>
                                <p className="text-base font-normal text-[#222222]">
                                  Service animals aren’t pets, so there’s no
                                  need to add them here.
                                </p>
                                <p className="text-base font-normal text-[#222222]">
                                  Travelling with an emotional support animal?
                                  Check out our accessibility policy.
                                </p>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              className="no-focus size-8 rounded-full border flex items-center justify-center text-black p-[5px]"
                              variant="ghost"
                            >
                              <Minus className="" />
                            </Button>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                defaultValue={0}
                                autoComplete="off"
                                aria-autocomplete="none"
                                autoCorrect="off"
                                className="btn-semibold text-center bg-transparent text-black w-10 flex  no-focus text-sm border-none"
                              />
                            </FormControl>
                            <Button
                              className="no-focus size-8 rounded-full border flex items-center justify-center text-black p-[5px]"
                              variant="ghost"
                            >
                              <Plus className="" />
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button className="rounded-full p-4 h-[48px]">
              <Search className="size-4" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default StayForm;
