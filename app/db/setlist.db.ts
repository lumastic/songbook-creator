import type { Setlist, Song } from "@prisma/client";
import { prisma } from "./db.server";

export async function getSetlist({ id }: Pick<Setlist, "id">) {
  return await prisma.setlist.findFirst({
    where: { id },
  });
}

export async function getSetlists() {
  return await prisma.setlist.findMany();
}

export async function createSetlist(
  data?: Pick<Setlist, "name" | "description">
) {
  return await prisma.setlist.create({
    data: { ...data },
  });
}

export async function updateSetlist({
  id,
  data,
  songs,
}: {
  id: Setlist["id"];
  data: Pick<Setlist, "name" | "description">;
  songs: Pick<Song, "id">[];
}) {
  return await prisma.setlist.update({
    where: { id },
    data: {
      ...data,
      songs: {
        set: songs,
      },
    },
  });
}
