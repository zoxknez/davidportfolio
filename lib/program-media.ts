import { type Program } from "@/data/programs";

export type Media = { kind: "image"; src: string } | { kind: "video"; src: string; poster?: string };

/**
 * Creates a media array from program data (images, gallery, trailer)
 * @param program The program object
 * @param includeFallback Whether to include a fallback image if no media exists
 * @returns Array of media items
 */
export function createProgramMedia(program: Program, includeFallback = false): Media[] {
  const arr: Media[] = [];
  if (program.image) arr.push({ kind: "image", src: program.image });
  if (program.gallery?.length) {
    arr.push(...program.gallery.map((g) => ({ kind: "image", src: g } as Media)));
  }
  if (program.trailer) {
    arr.push({ kind: "video", src: program.trailer, poster: program.image });
  }
  if (arr.length === 0 && includeFallback) {
    arr.push({ kind: "image", src: "/vercel.svg" });
  }
  return arr;
}

