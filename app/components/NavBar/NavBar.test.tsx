import { render, screen } from "@testing-library/react";
import { NavBar } from "./NavBar";

test("Should render", () => {
  render(<NavBar />);

  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});
