import type { IMarking, ISong, IStanza } from "@/types/song";
import uniqid from "uniqid";

const defaultSong = (): ISong => ({
  id: uniqid(),
  title: "Helplessness Blue",
  attribution: "Feet Foxes",
  stanzas: [
    {
      id: uniqid(),
      type: "verse",
      lines: [
        {
          id: uniqid(),
          lyrics: "I was raised up believing",
          markings: [
            createMockChordMark({ primary_mark: "E", indent: 0 }),
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
            createMockChordMark({ primary_mark: "A", indent: 8 }),
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
            createMockChordMark({ primary_mark: "B", indent: 8 }),
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
            createMockChordMark({ primary_mark: "A", indent: 1 }),
            createMockBreakMark({ indent: 22 }),
            createMockChordMark({ primary_mark: "E", indent: 23 }),
          ],
          notes: "Start building...",
        },
      ],
    },
  ],
});

export function createMockSong(p?: Partial<ISong>): ISong {
  if (!p) return defaultSong();
  return { ...defaultSong(), ...p } as ISong;
}

export function createMockMarking(p: Partial<IMarking>): IMarking {
  return { id: uniqid(), indent: 0, type: "repeat", ...p };
}

export function createMockChordMark(p: Partial<IMarking>): IMarking {
  return createMockMarking({ primary_mark: "C", ...p, type: "chord" });
}

export function createMockBreakMark(p: Partial<IMarking>): IMarking {
  return createMockMarking({
    indent: 0,
    primary_mark: "/",
    ...p,
    type: "measure_break",
  });
}

export function createMockRepeatMark(p: Partial<IMarking>): IMarking {
  return createMockMarking({
    indent: 0,
    primary_mark: "-",
    ...p,
    type: "repeat",
  });
}

export function createMockStanza(p: Partial<IStanza>): IStanza {
  return {
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
  };
}
