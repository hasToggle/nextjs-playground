import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createPromise(data: any) {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, Math.random() * 12000);
  });
}
