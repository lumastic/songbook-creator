import { render, screen } from "@testing-library/react";
import { SetlistForm } from "./SetlistForm";

test.skip("Should render", () => {
  // render(<SetlistForm />);

  expect(screen.getByTestId("setlistform")).toBeInTheDocument();
});
