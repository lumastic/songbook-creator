import { createMockSong } from "@/test/factories/song.factory";
import React from "react";
import { MarkingsFieldArray } from "./MarkingsFieldArray";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: MarkingsFieldArray,
  title: "MarkingsFieldArray",
};

const defaultSong = createMockSong();

export const Basic: React.FC = () => {
  return <MarkingsFieldArray line={defaultSong.stanzas[0].lines[0]} />;
};
