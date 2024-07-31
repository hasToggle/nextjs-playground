"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function CurrentPathLink({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) {
  const pathname = usePathname();
  return <Link href={`${pathname}/${id}`}>{children}</Link>;
}
