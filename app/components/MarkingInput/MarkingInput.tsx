import type { IMarking } from "@/types/song";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { ChangeEvent, KeyboardEvent } from "react";
import React, { useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

type Props = {
  marking: IMarking;
  deleteMark?: () => void;
};

export const MarkingInput: React.FC<Props> = ({ marking, deleteMark }) => {
  const [mark, setMark] = useState<string>(marking.mark || "");
  const [indent, setIndent] = useState<number>(marking.indent || 0);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key === "Backspace" && target.value === "") {
      e.preventDefault();
      // console.log("Delete");
      if (deleteMark) deleteMark();
    }
  };

  const moveLeft = () => {
    setIndent((value) => (value ? value - 1 : 0));
  };

  const moveRight = () => {
    setIndent((value) => value + 1);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace("b", "♭");
    value = value.replace("#", "♯");

    setMark(value);
  };

  return (
    <div
      className="absolute z-10 group/marking font-mono"
      style={{
        left: `${indent}ch`,
      }}
    >
      <div className="relative">
        <Button
          variant="text"
          icon
          size="sm"
          className="absolute -left-9 -top-0.5 hidden group-focus-within/marking:block"
          onClick={moveLeft}
        >
          <ChevronLeftIcon width={"1em"} />
        </Button>
        <Input
          name="mark"
          value={mark}
          onChange={onChange}
          onKeyDown={onKeyDown}
          style={{
            width: `${mark.length || 1}ch`,
          }}
          className="font-mono rounded-sm !bg-stone-200 w-auto"
        />
        <Button
          variant="text"
          icon
          size="sm"
          className="absolute -right-9 -top-0.5 hidden group-focus-within/marking:block"
          onClick={moveRight}
        >
          <ChevronRightIcon width={"1em"} />
        </Button>
      </div>

      <Input hidden readOnly name="indent" value={indent} />
      <Input hidden readOnly name="id" value={marking.id} />
    </div>
  );
};
