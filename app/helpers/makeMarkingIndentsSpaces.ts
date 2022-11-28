import type { IMarking } from "@/types/song";

export function makeMarkingsIndentsSpaces(markings: IMarking[]): IMarking[] {
  const spacedMarkings = [] as IMarking[];
  let distanceToBeginning = 0;
  markings.forEach((marking) => {
    const relativeIndent = marking.indent - distanceToBeginning;
    distanceToBeginning += relativeIndent;
    spacedMarkings.push({ ...marking, indent: relativeIndent });
  });
  return spacedMarkings;
}
