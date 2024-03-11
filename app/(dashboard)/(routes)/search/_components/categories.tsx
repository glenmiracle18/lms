"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";

import {
  FcCalculator,
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { BsRobot } from "react-icons/bs";
import { CatergoryItem } from "./categorie-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcMusic,
  Accounting: FcCalculator,
  Engineering: FcEngineering,
  Robotics: BsRobot,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Music: FcMusic,
  "Content Creation": FcFilmReel,
};
export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CatergoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
