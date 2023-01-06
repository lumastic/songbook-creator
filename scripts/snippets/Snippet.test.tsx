import { render, screen } from "@testing-library/react";
import { COMPONENT_NAME } from "./COMPONENT_NAME";

test("Should render", () => {
  render(<COMPONENT_NAME />);

  expect(screen.getByTestId("component_name")).toBeInTheDocument();
});
