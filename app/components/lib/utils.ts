import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
  audio.volume = 0.4;
  audio.loop = false;
  audio.muted = false;
};
