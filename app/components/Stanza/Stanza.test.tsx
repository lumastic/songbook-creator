import { createMockStanza } from "@/test/factories/song.factory";
import { render, screen } from "@testing-library/react";
import { Stanza } from "./Stanza";

test("Should render", () => {
  render(<Stanza stanza={createMockStanza({})} />);

  expect(screen.getByTestId("stanza")).toBeInTheDocument();
});
