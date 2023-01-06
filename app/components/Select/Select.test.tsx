import { render, screen } from "@testing-library/react";
import { Select } from "./Select";

test("Should render", () => {
  render(<Select options={[]} name="select" />);

  expect(screen.getByTestId("select")).toBeInTheDocument();
});
