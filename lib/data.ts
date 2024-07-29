import SquareOne from "@/public/square-1.svg";
import SquareTwo from "@/public/square-2.svg";
import SquareThree from "@/public/square-3.svg";
import SquareFour from "@/public/square-4.svg";

type Product = {
  id: number;
  name: string;
};

const products = [
  {
    id: 1,
    name: "Infinite Scroll Squirrel",
  },
  {
    id: 2,
    name: "Async Avocado",
  },
  {
    id: 3,
    name: "Hydration Hippo",
  },
  {
    id: 4,
    name: "Pre-rendered Panda",
  },
];

const createNumberDispenser = () => {
  const numbers = [SquareFour, SquareThree, SquareTwo, SquareOne];
  return () => numbers.pop() || "";
};

export { products, type Product, createNumberDispenser };
