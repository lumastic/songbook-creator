import type { Setlist, Song } from "@prisma/client";
import { prisma } from "./db.server";
import QRCode from "qrcode";

export async function getSetlist({ id }: Pick<Setlist, "id">) {
  return await prisma.setlist.findFirst({
    where: { id },
    include: {
      songs: true,
    },
  });
}

export async function getSetlists() {
  return await prisma.setlist.findMany({
    include: {
      songs: {
        select: {
          id: true,
        },
      },
    },
  });
}

export async function getMySetlists(userId: number) {
  return await prisma.setlist.findMany({
    where: { authorId: userId },
    include: {
      songs: {
        select: {
          id: true,
        },
      },
    },
  });
}

export async function createSetlist(
  data?: Pick<Setlist, "name" | "description" | "authorId">
) {
  return await prisma.setlist.create({
    data: { ...data },
  });
}

export async function setQRCode(
  setlist: Pick<Setlist, "id">,
  request: Request
) {
  const origin = new URL(request.url).origin;
  // Make the link agnostic of other routes so that we can always forward it where we want to go
  let qrcode = await QRCode.toString(
    `${origin}/setlists/${setlist.id}/qrcode`,
    {
      type: "svg",
      color: {
        light: "#FFFFFF",
        dark: "#000000",
      },
    }
  );
  qrcode = qrcode
    .replace("#000000", "currentColor")
    .replace("#FFFFFF", "none")
    .replace(
      'viewBox="0 0 45 45"',
      "width='1em' height='1em' viewBox='2 2 41 41'"
    );

  return await prisma.setlist.update({
    where: {
      id: setlist.id,
    },
    data: {
      qrcode,
    },
  });
}

export async function updateSetlist({
  id,
  data,
}: {
  id: Setlist["id"];
  data: Pick<Setlist, "name" | "description">;
}) {
  return await prisma.setlist.update({
    where: { id },
    data,
  });
}

export async function addSongsToSetlist({
  id,
  songs,
}: {
  id: Setlist["id"];
  songs: Song["id"][];
}) {
  return await prisma.setlist.update({
    where: { id },
    data: {
      songs: {
        connect: songs.map((songId) => ({
          id: songId,
        })),
      },
    },
  });
}

export async function removeSongsFromSetlist({
  id,
  songs,
}: {
  id: Setlist["id"];
  songs: Song["id"][];
}) {
  return await prisma.setlist.update({
    where: { id },
    data: {
      songs: {
        disconnect: songs.map((songId) => ({
          id: songId,
        })),
      },
    },
  });
}
