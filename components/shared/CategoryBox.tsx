"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}
const CategoryBox = ({ label, icon: Icon, selected }: CategoryBoxProps) => {
  return (
    <div
      className={`flex flex-col w-fit  gap-2 items-center justify-center px-3 py-1 border-b-2  transition cursor-pointer ${
        selected ? "border-b-text-secondary-textBlack" : "border-transparent"
      }`}
    >
      <Icon
        size={26}
        className="text-secondary-text hover:text-secondary-textBlack"
      />
      <p
        className={`font-medium text-xs hover:text-secondary-textBlack text-secondary-text ${
          selected && "text-secondary-textBlack font-semibold"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default CategoryBox;
