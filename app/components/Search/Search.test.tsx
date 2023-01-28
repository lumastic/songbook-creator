import { render, screen } from "@testing-library/react";
import { Search } from "./Search";

test("Should render", () => {
  render(<Search onSearch={() => {}} />);

  expect(screen.getByTestId("search")).toBeInTheDocument();
});
