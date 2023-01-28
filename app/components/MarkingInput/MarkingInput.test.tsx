import { createMockMarking } from "@/test/factories/song.factory";
import { render, screen } from "@testing-library/react";
import { MarkingInput } from "./MarkingInput";

test("Should render", () => {
  render(<MarkingInput marking={createMockMarking({})} />);

  expect(screen.getByTestId("markinginput")).toBeInTheDocument();
});
