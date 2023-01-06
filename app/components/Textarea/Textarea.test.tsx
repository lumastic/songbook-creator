import { render, screen } from "@testing-library/react";
import { Textarea } from "./Textarea";

test("Should render", () => {
  render(<Textarea />);

  expect(screen.getByTestId("textarea")).toBeInTheDocument();
});
