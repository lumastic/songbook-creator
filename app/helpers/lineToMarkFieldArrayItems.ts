import type { ILine, IMarking } from "@/types/song";

export function lineToMarkFieldArrayItems(
  line: ILine
): (IMarking | undefined)[] {
  const lyricCharactersCount = line.lyrics.length;
  const arrayItems = new Array(
    lyricCharactersCount > 1 ? lyricCharactersCount + 1 : 30
  ).fill(undefined);
  line.markings.forEach((marking) => {
    arrayItems[marking.indent] = marking;
  });
  return arrayItems;
}
