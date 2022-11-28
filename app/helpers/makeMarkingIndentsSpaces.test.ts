import {
  createMockBreakMark,
  createMockChordMark,
  createMockRepeatMark,
} from "@/test/factories/song";
import { IMarking } from "@/types/song";
import { makeMarkingsIndentsSpaces } from "./makeMarkingIndentsSpaces";

const inputMarks1 = [
  createMockChordMark({ primary_mark: "E", indent: 0 }),
  createMockBreakMark({ indent: 7 }),
  createMockRepeatMark({ indent: 13 }),
  createMockBreakMark({ indent: 20 }),
  createMockRepeatMark({ indent: 24 }),
] as IMarking[];

const expectedIndents1 = [0, 7, 6, 7, 4];

test("should convert indents from index to spaces from previous mark", () => {
  const spacedMarks = makeMarkingsIndentsSpaces(inputMarks1);
  spacedMarks.forEach((mark, index) => {
    expect(mark.indent).toBe(expectedIndents1[index]);
  });
});
