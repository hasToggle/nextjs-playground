import Image from "next/image";

import Question from "@/public/question.svg";
import SquareOne from "@/public/square-1.svg";
import SquareTwo from "@/public/square-2.svg";
import SquareThree from "@/public/square-3.svg";
import SquareFour from "@/public/square-4.svg";

export default function Number({ value = 0 }: { value: number }) {
  const numbers = [Question, SquareOne, SquareTwo, SquareThree, SquareFour];
  const SVG = numbers[value];
  return (
    <Image
      alt="Indicates the order in which the items have been rendered."
      className="mx-auto aspect-square rounded-md"
      height="40"
      src={SVG}
      width="40"
    />
  );
}
