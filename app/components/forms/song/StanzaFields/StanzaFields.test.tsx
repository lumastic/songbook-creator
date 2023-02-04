import { createMockStanza } from "@/test/factories/song.factory";
import { render, screen } from "@testing-library/react";
import { StanzaFields } from "./StanzaFields";

test("Should render", () => {
  render(<StanzaFields stanza={createMockStanza({})} />);

  expect(screen.getByTestId("line-fields")).toBeInTheDocument();
});
