import type { ILine, IMarking } from "@/types/song";

export function lineToMarkFieldArrayItems(line: ILine): (IMarking | null)[] {
  const lyricCharactersCount = line.lyrics.length;
  const arrayItems = new Array(Math.max(lyricCharactersCount + 1, 30));
  line.markings.forEach((marking) => {
    arrayItems[marking.indent] = marking;
  });
  return arrayItems;
}
