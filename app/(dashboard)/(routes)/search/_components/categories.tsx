"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons/lib";

// import the category icon's from react icons'
import { FaCalculator, FaLaptopCode } from "react-icons/fa";

import { BsRobot } from "react-icons/bs";
import { MdEngineering } from "react-icons/md";
import { FcSportsMode, FcCamera, FcMusic, FcFilmReel } from "react-icons/fc";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Accounting: FaCalculator,
  Engineering: MdEngineering,
  "Computer Science": FaLaptopCode,
  Robotics: BsRobot,
  Photography: FcCamera,
  Fitness: FcSportsMode,
  "Content Creation": FcFilmReel,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <>
      <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {items.map((item) => (
          <CategoryItem
            key={item.id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item.id}
          />
        ))}
      </div>
    </>
  );
};
