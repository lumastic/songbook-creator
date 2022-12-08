import { createMockSong } from "@/test/factories/song.factory";
import { lineToMarkFieldArrayItems } from "./lineToMarkFieldArrayItems";

const defaultSong = createMockSong();

describe("Array length", () => {
  test("should convert line to an array of 1 greater than length of lyrics", () => {
    const testLine = defaultSong.stanzas[0].lines[2];
    const fieldArrayItems = lineToMarkFieldArrayItems(testLine);

    expect(fieldArrayItems.length).toBe(testLine.lyrics.length + 1);
  });

  test("should convert empty line to an array of 30 null characters", () => {
    const testLine = defaultSong.stanzas[0].lines[0];
    testLine.lyrics = "";
    const fieldArrayItems = lineToMarkFieldArrayItems(testLine);

    expect(fieldArrayItems.length).toBe(30);
  });
});

test("should insert markings in the array at the index of their indent value", () => {
  const testLine1 = defaultSong.stanzas[0].lines[0];
  const fieldArrayItems = lineToMarkFieldArrayItems(testLine1);

  testLine1.markings.forEach((marking) => {
    expect(fieldArrayItems[marking.indent]).toMatchObject(marking);
  });
});
