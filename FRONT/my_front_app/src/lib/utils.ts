import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // remplace espaces par tirets
    .replace(/[^\w\-]+/g, '')       // supprime caractères spéciaux
    .replace(/\-\-+/g, '-');        // remplace tirets doubles par un seul
}
