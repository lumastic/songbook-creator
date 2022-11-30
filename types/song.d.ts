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
  type: "chord" | "measure_break" | "repeat";
  indent: number;
  primary_mark?: INote | "/" | "-";
  secondary_mark?: INote | "/" | "-";
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

export interface ISong {
  id: string;
  title: string;
  attribution: string;
  stanzas: IStanza[];
}
