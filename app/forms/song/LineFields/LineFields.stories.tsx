import { createMockSong } from "@/test/factories/song.factory";
import { LineFields } from "./LineFields";

export const Basic = () => (
  <LineFields line={createMockSong().stanzas[0].lines[0]} />
);
