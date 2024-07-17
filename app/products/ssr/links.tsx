"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function ImageLink({
  id,
  src,
  alt,
}: {
  id: number;
  src: string;
  alt: string;
}) {
  const pathname = usePathname();
  const segment = pathname.split("/")[3];
  return (
    <Link href={`/products/ssr/${segment}/${id}`}>
      <Image
        alt={alt}
        className="aspect-square rounded-md object-cover"
        height="64"
        src={src}
        width="64"
      />
    </Link>
  );
}

export function TextLink({ id, name }: { id: number; name: string }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[3];
  return <Link href={`/products/ssr/${segment}/${id}`}>{name}</Link>;
}
