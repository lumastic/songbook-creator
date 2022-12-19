import type { ILine, IMarking } from "@/types/song";

export function lineToMarkFieldArrayItems(
  line: ILine
): (IMarking | undefined)[] {
  const lyricCharactersCount = line.lyrics.length;
  const arrayItems = new Array(Math.max(lyricCharactersCount + 1, 50)).fill(
    undefined
  );
  line.markings.forEach((marking) => {
    arrayItems[marking.indent] = marking;
  });
  return arrayItems;
}
