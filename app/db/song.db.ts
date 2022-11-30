import type { INote } from "@/types/song";

type Marks = INote | "/" | "-";

export const available_marks: Marks[] = [
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
