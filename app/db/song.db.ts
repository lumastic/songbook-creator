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

/**
 * Gets the songs of the currently logged in user
 * @param userId
 * @returns
 */
export async function getUserSongs(userId: number) {
  return await prisma.song.findMany({ where: { authorId: userId } });
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
  data: Pick<Song, "title" | "attribution" | "stanzas" | "runtime" | "notes">;
}) {
  return await prisma.song.update({ where: { id: +id }, data });
}
