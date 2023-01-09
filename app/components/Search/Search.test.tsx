import { render, screen } from "@testing-library/react";
import { Search } from "./Search";

test("Should render", () => {
  render(<Search />);

  expect(screen.getByTestId("search")).toBeInTheDocument();
});
