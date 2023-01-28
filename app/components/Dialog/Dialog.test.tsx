import { render, screen } from "@testing-library/react";
import { Dialog } from "./Dialog";

test("Should render", () => {
  render(<Dialog onClose={() => {}} title="My Modal" isOpen={true} />);

  expect(screen.getByTestId("dialog")).toBeInTheDocument();
});
