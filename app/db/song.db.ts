import type { IStanza } from "@/types/song";
import type { Song } from "@prisma/client";
import { prisma } from "./db.server";
import uniqid from "uniqid";

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
  return await prisma.song.findFirst({
    where: { id },
  });
}

export async function getSongs() {
  return await prisma.song.findMany();
}

export async function createSong({ authorId }: Pick<Song, "authorId">) {
  return await prisma.song.create({
    data: {
      title: "",
      attribution: "",
      stanzas: JSON.stringify(defaultStanzas),
      authorId,
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
  return await prisma.song.update({ where: { id: +id }, data });
}
