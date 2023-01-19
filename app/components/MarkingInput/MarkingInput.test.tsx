import { render, screen } from "@testing-library/react";
import { MarkingInput } from "./MarkingInput";

test("Should render", () => {
  render(<MarkingInput />);

  expect(screen.getByTestId("markinginput")).toBeInTheDocument();
});
