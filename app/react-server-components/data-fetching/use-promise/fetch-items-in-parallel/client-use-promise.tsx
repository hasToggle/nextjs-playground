"use client";

import { use } from "react";

import { Product } from "@/lib/data";

import { Row } from "../../table";
import { useNumberDispenser } from "./number-dispenser-context";

export default function Item({
  product,
  fetchDetails,
}: {
  product: Promise<Product | undefined>;
  fetchDetails: {
    fetchedOn: string;
    source: string;
    time: Date;
  };
}) {
  const prod = use(product);
  const getOrder = useNumberDispenser();

  if (!prod) return null;

  return <Row product={prod} fetchDetails={fetchDetails} order={getOrder()} />;
}
