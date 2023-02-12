import type { ILine, IMarking, IStanza } from "@/types/song";
import type { Song } from "@prisma/client";
import uniqid from "uniqid";

const defaultSong = (): Song => ({
  id: 1234,
  title: "Helplessness Blue",
  attribution: "Feet Foxes",
  published: true,
  authorId: 1234,
  setlistId: null,
  stanzas: JSON.stringify([
    {
      id: uniqid(),
      type: "verse",
      lines: [
        {
          id: uniqid(),
          lyrics: "I was raised up believing",
          markings: [
            createMockChordMark({ mark: "E", indent: 0 }),
            createMockBreakMark({ indent: 7 }),
            createMockRepeatMark({ indent: 13 }),
            createMockBreakMark({ indent: 20 }),
            createMockRepeatMark({ indent: 24 }),
          ],
          notes: "",
        },
        {
          id: uniqid(),
          lyrics: "I was somehow unique",
          markings: [
            createMockBreakMark({ indent: 7 }),
            createMockChordMark({ mark: "A", indent: 8 }),
            createMockBreakMark({ indent: 20 }),
            createMockRepeatMark({ indent: 22 }),
          ],
          notes: "",
        },
        {
          id: uniqid(),
          lyrics: "Like a snowflake distinct among snowflakes",
          markings: [
            createMockBreakMark({ indent: 7 }),
            createMockChordMark({ mark: "B", indent: 8 }),
            createMockBreakMark({ indent: 20 }),
            createMockRepeatMark({ indent: 32 }),
          ],
          notes: "",
        },
        {
          id: uniqid(),
          lyrics: "Unique in each way you can see",
          markings: [
            createMockBreakMark({ indent: 0 }),
            createMockChordMark({ mark: "A", indent: 1 }),
            createMockBreakMark({ indent: 22 }),
            createMockChordMark({ mark: "E", indent: 23 }),
          ],
          notes: "Start building...",
        },
      ],
    },
  ]),
  createdAt: new Date(),
  updatedAt: new Date(),
});

export function createMockSong(p?: Partial<Song>): Song {
  if (!p) return defaultSong();
  return { ...defaultSong(), ...p } as Song;
}

export function createMockMarking(p: Partial<IMarking>): IMarking {
  return { id: uniqid(), indent: 0, ...p };
}

export function createMockChordMark(p: Partial<IMarking>): IMarking {
  return createMockMarking({ mark: "C", ...p });
}

export function createMockBreakMark(p: Partial<IMarking>): IMarking {
  return createMockMarking({
    indent: 0,
    mark: "/",
    ...p,
  });
}

export function createMockRepeatMark(p: Partial<IMarking>): IMarking {
  return createMockMarking({
    indent: 0,
    mark: "-",
    ...p,
  });
}

export function createMockStanza(p: Partial<IStanza>): IStanza {
  return {
    id: uniqid(),
    type: "verse",
    lines: [createMockLine()],
    ...p,
  };
}

export function createMockLine(p?: Partial<ILine>): ILine {
  return {
    id: uniqid(),
    lyrics: "",
    markings: [],
    notes: "",
    ...p,
  };
}
