import type { Song } from "@prisma/client";

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
