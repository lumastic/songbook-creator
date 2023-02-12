import { createMockLine } from "@/test/factories/song.factory";
import type { ILine } from "@/types/song";

export function convertPlainTextToLines(text: string) {
  // Split text into Lines

  const textSplitIntoLyrics = text.split("\n");
  const lines = [] as ILine[];
  textSplitIntoLyrics.forEach((lyrics) => {
    lines.push(createMockLine({ lyrics }));
  });

  return lines;
}
