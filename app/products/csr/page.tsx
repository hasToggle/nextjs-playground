"use client";

import { useEffect, useState } from "react";

export default function CSR() {
  const [data, setData] = useState(null);

  /* useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/products");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []); */

  return null;
}
