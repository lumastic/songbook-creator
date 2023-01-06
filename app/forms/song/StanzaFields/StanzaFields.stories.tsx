import { createMockStanza } from "@/test/factories/song.factory";
import { StanzaFields } from "./StanzaFields";

export const Basic = () => <StanzaFields stanza={createMockStanza({})} />;
