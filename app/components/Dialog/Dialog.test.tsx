import { render, screen } from "@testing-library/react";
import { Dialog } from "./Dialog";

test("Should render", () => {
  render(<Dialog />);

  expect(screen.getByTestId("dialog")).toBeInTheDocument();
});
