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
  type: "chord" | "measure_break" | "repeat";
  indent: number;
  primary_mark?: INote | "/" | "-";
  secondary_mark?: INote | "/" | "-";
}

export interface ILine {
  lyrics: string;
  markings: IMarking[];
  notes: string;
}

export interface IStanza {
  type?: "chorus" | "verse" | "bridge" | "intro";
  lines: ILine[];
}

export interface ISong {
  title: string;
  attribution: string;
  stanzas: IStanza[];
}
