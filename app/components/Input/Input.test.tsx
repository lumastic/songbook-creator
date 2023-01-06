import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

test("Should render", () => {
  render(<Input />);

  expect(screen.getByTestId("input")).toBeInTheDocument();
});
