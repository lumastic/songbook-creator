import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("Should render", () => {
  render(<Button />);

  expect(screen.getByTestId("button")).toBeInTheDocument();
});
