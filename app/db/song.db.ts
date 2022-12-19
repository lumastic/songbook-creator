import type { INote, ISong } from "@/types/song";
import uniqid from "uniqid";

export type Mark = INote | "/" | "-";

export const available_marks: Mark[] = [
  "-",
  "/",
  "A",
  "A♭",
  "A♯",
  "B",
  "B♭",
  "B♯",
  "C",
  "C♭",
  "C♯",
  "D",
  "D♭",
  "D♯",
  "E",
  "E♭",
  "E♯",
  "F",
  "F♭",
  "F♯",
  "G",
  "G♭",
  "G♯",
];

export const createSong = (): ISong => {
  return {
    id: uniqid(),
    title: "",
    attribution: "",
    stanzas: [
      {
        id: uniqid(),
        type: "verse",
        lines: [
          {
            id: uniqid(),
            lyrics: "",
            markings: [],
            notes: "",
          },
        ],
      },
    ],
  };
};
