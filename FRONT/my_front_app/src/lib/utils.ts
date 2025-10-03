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
    .replace(/\s+/g, '-')           // replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // delete special characters
    .replace(/\-\-+/g, '-');        // replace doule hyphens by one
}
