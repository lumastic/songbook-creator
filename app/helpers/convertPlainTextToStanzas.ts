import {
  createMockLine,
  createMockStanza,
} from "@/test/factories/song.factory";
import type { ILine, IStanza } from "@/types/song";

export function convertPlainTextToStanzas(text: string) {
  // Split text into Stanzas
  const textSplitByStanzas = text.split("\n\n");
  const stanzas = [] as IStanza[];
  textSplitByStanzas.forEach((stanzaText) => {
    const textSplitIntoLyrics = stanzaText.split("\n");
    const lines = [] as ILine[];
    textSplitIntoLyrics.forEach((lyrics) => {
      lines.push(createMockLine({ lyrics }));
    });
    stanzas.push(createMockStanza({ lines }));
  });

  return stanzas;
}
