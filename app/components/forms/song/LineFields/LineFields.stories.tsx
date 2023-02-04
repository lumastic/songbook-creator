import { createMockStanza } from "@/test/factories/song.factory";
import { LineFields } from "./LineFields";

export const Basic = () => <LineFields line={createMockStanza({}).lines[0]} />;
