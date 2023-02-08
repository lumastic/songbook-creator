import type { ILine } from "@/types/song";
import { convertPlainTextToLines } from "./convertPlainTextToLines";

const samplePastedText =
  "This is a song\nWith an single stanza\nThis is a song";

const singleStanzaConverted: ILine[] = [
  {
    id: expect.any(String),
    lyrics: "This is a song",
    markings: [],
    notes: "",
  },
  {
    id: expect.any(String),
    lyrics: "With an single stanza",
    markings: [],
    notes: "",
  },
  {
    id: expect.any(String),
    lyrics: "This is a song",
    markings: [],
    notes: "",
  },
];

test("Should convert to list with single stanza", () => {
  expect(convertPlainTextToLines(samplePastedText)).toMatchObject(
    singleStanzaConverted
  );
});
