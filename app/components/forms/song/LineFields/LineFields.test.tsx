import { createMockStanza } from "@/test/factories/song.factory";
import { render, screen } from "@testing-library/react";
import { LineFields } from "./LineFields";

test("Should render", () => {
  const { container } = render(
    <LineFields line={createMockStanza({}).lines[0]} />
  );

  expect(screen.getByTestId("line-fields")).toBeInTheDocument();
  expect(container.querySelector("input[name='lyrics']")).toBeInTheDocument();
  expect(container.querySelector("input[name='notes']")).toBeInTheDocument();
});
