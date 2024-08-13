"use client";

import { use } from "react";

import { Row } from "../table";

import { createNumberDispenser } from "@/lib/utils";

export default function ClientComponent({
  fetchDetails,
  products,
}: {
  fetchDetails: {
    fetchedOn: string;
    source: string;
    time: Date;
  };
  products: Promise<Array<any>>;
}) {
  const prods = use(products);
  const getOrder = createNumberDispenser();

  return (
    <>
      {prods.map((product) => (
        <Row
          key={product.id}
          order={getOrder()}
          fetchDetails={fetchDetails}
          product={product}
        />
      ))}
    </>
  );
}
