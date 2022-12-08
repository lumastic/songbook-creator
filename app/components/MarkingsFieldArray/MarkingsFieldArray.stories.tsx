import { createMockSong } from "@/test/factories/song.factory";
import { MarkingsFieldArray } from "./MarkingsFieldArray";

export const Basic = () => (
  <MarkingsFieldArray line={createMockSong().stanzas[0].lines[0]} />
);
