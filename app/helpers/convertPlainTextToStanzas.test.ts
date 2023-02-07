import type { IStanza } from "@/types/song";
import { convertPlainTextToStanzas } from "./convertPlainTextToStanzas";

const singleStanzaText =
  "This is a song\nWith an single stanza\nThis is a song";

const singleStanzaConverted: IStanza[] = [
  {
    type: expect.anything(),
    id: expect.any(String),
    lines: [
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
    ],
  },
];

test("Should convert to list with single stanza", () => {
  expect(convertPlainTextToStanzas(singleStanzaText)).toMatchObject(
    singleStanzaConverted
  );
});

const multipleStanzaText =
  "This is a song\nWith an single stanza\nThis is a song\n\nThis is a song\nWith an single stanza\nThis is a song";

const multipleStanzaConverted: IStanza[] = [
  {
    type: expect.anything(),
    id: expect.any(String),
    lines: [
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
    ],
  },
  {
    type: expect.anything(),
    id: expect.any(String),
    lines: [
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
    ],
  },
];

test("Should convert to list with multiple stanzas", () => {
  expect(convertPlainTextToStanzas(multipleStanzaText)).toMatchObject(
    multipleStanzaConverted
  );
});
