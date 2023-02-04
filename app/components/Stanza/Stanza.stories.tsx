import { createMockStanza } from "@/test/factories/song.factory";
import { Stanza } from "./Stanza";

export const Basic = () => <Stanza stanza={createMockStanza({})} />;
