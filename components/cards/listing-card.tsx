"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Dot, Heart, Star, Upload } from "lucide-react";

interface ListingCardProps {
  sharebtn?: boolean;
}

const ListingCard = ({ sharebtn }: ListingCardProps) => {
  return (
    <div className="">
      <div className="h-[400px] relative ms:h-[250px] md:h-[350px] lg:h-[250px] xl:h-[300px]">
        <Carousel className="w-full h-full" opts={{ align: "start" }}>
          <CarouselContent className="">
            <CarouselItem
              className="
             relative w-full h-[400px] ms:h-[250px] md:h-[350px] lg:h-[250px] xl:h-[300px] pl-1"
            >
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1716048885/3fee65e1-aa34-46b8-a9a9-6a72ad97fc2e_tolmsb.png"
                alt="Image image"
                fill
                className="object-cover  size-full  rounded-[20px]"
              />
            </CarouselItem>
            <CarouselItem
              className="
             relative w-full h-[400px] ms:h-[250px] md:h-[350px] lg:h-[250px] xl:h-[300px] pl-1 "
            >
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1716048885/3fee65e1-aa34-46b8-a9a9-6a72ad97fc2e_tolmsb.png"
                alt="Image image"
                fill
                className="object-cover  size-full rounded-[20px] "
              />
            </CarouselItem>
            <CarouselItem
              className="
             relative w-full h-[400px] ms:h-[250px] md:h-[350px] lg:h-[250px] xl:h-[300px] pl-1 "
            >
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1716048885/3fee65e1-aa34-46b8-a9a9-6a72ad97fc2e_tolmsb.png"
                alt="Image image"
                fill
                className="object-cover  size-full rounded-[20px] "
              />
            </CarouselItem>
            <CarouselItem
              className="
             relative w-full h-[400px] ms:h-[250px] md:h-[350px] lg:h-[250px] xl:h-[300px] pl-1 "
            >
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1716048885/3fee65e1-aa34-46b8-a9a9-6a72ad97fc2e_tolmsb.png"
                alt="Image image"
                fill
                className="object-cover  size-full rounded-[20px] "
              />
            </CarouselItem>
            <CarouselItem
              className="
             relative w-full h-[400px] ms:h-[250px] md:h-[350px] lg:h-[250px] xl:h-[300px] pl-1 "
            >
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1716048885/3fee65e1-aa34-46b8-a9a9-6a72ad97fc2e_tolmsb.png"
                alt="Image image"
                fill
                className="object-cover  size-full rounded-[20px] "
              />
            </CarouselItem>
          </CarouselContent>
          <div className="">
            <CarouselPrevious className="flex left-2 " />
            <CarouselNext className="flex right-2 " />
          </div>
        </Carousel>
        <div className="flex justify-between items-start w-full flex-col-reverse absolute p-4 top-0 left-0 z-10">
          <div className="ml-auto bg-green-900">
            {sharebtn ? (
              <Upload className=" absolute right-3 size-8 cursor-pointer hover:bg-primary hover:text-white bg-white p-2 rounded-full  top-4 border-white" />
            ) : (
              <Heart
                className=" absolute right-3 size-6 text-white top-4 border-white"
                fill="#e2e2e2"
              />
            )}
          </div>
          <div>
            <span className="px-2 py-1 text-sm font-medium bg-white rounded-full">
              Guest Favorite
            </span>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-base">Valencia, Spain</h2>
            <p className="flex">
              Stay with Sagario <Dot /> Coach
            </p>
            <span>Jul 25 - Aug 1</span>
            <p>
              <b>$51 </b>
              <span>night</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star />
            4.87
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
