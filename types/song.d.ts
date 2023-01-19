import type { Song } from "@prisma/client";

export type INote =
  | "C"
  | "C♯"
  | "C♭"
  | "D"
  | "D♯"
  | "D♭"
  | "E"
  | "E♯"
  | "E♭"
  | "F"
  | "F♯"
  | "F♭"
  | "G"
  | "G♯"
  | "G♭"
  | "A"
  | "A♯"
  | "A♭"
  | "B"
  | "B♯"
  | "B♭";

export interface IMarking {
  id: string;
  indent: number;
  mark?: string;
}

export interface ILine {
  id: string;
  lyrics: string;
  markings: IMarking[];
  notes: string;
}

export interface IStanza {
  id: string;
  type?: "chorus" | "verse" | "bridge" | "intro";
  lines: ILine[];
}

export interface ISong extends Song {
  stanzas: IStanza[];
}
