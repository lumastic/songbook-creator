import { render, screen } from "@testing-library/react";
import { Stanza } from "./Stanza";

test("Should render", () => {
  render(<Stanza />);

  expect(screen.getByTestId("stanza")).toBeInTheDocument();
});
