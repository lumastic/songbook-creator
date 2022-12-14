import type { INote, IStanza } from "@/types/song";
import type { Song } from "@prisma/client";
import { prisma } from "./db.server";
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

export const defaultStanzas: IStanza[] = [
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
];

export async function getSong({ id }: Pick<Song, "id">) {
  return prisma.song.findFirst({
    where: { id },
  });
}

export async function createSong(
  data?: Pick<Song, "title" | "attribution" | "stanzas">
) {
  return await prisma.song.create({
    data: {
      ...data,
      stanzas: data?.stanzas || JSON.stringify(defaultStanzas),
    },
  });
}

export async function updateSong({
  id,
  data,
}: {
  id: Song["id"];
  data: Pick<Song, "title" | "attribution" | "stanzas">;
}) {
  return await prisma.song.update({ where: { id }, data });
}
