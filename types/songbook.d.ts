import type { ISong } from "./song";

export interface ISongbook {
  title: string;
  author: string;
  songs: ISong[];
}
