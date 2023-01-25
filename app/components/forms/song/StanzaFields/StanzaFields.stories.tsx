import { createMockStanza } from "@/test/factories/song.factory";
import { StanzaFields } from "./StanzaFields";

export const Basic = () => (
  <StanzaFields
    stanza={createMockStanza({
      lines: [
        {
          lyrics: "This is a test of the Stanza Form",
          markings: [],
          id: "1234",
          notes: "",
        },
      ],
    })}
  />
);
