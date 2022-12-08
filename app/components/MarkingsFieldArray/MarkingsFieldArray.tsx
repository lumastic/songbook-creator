import { createMockMarking } from "@/test/factories/song.factory";
import type { ILine } from "@/types/song";
import { available_marks } from "~/db/song.db";
import { lineToMarkFieldArrayItems } from "~/helpers/lineToMarkFieldArrayItems";
import { Fieldset, Input, Select } from "~/lib/fieldset";
import { useArray } from "~/lib/useArray";

type Props = {
  line: ILine;
};

export const MarkingsFieldArray: React.FC<Props> = ({ line }) => {
  const {
    items: markingsFieldArray,
    insert,
    push,
  } = useArray(lineToMarkFieldArrayItems(line));
  // Instead, maybe just do kind of what I'm doing for spaces and add an amount of + buttons equal to the difference in indentation
  // Also, if it's the last element, always add one at the end.

  // Mmmm I actually don't think that handles the case very well where you want to swap the chords that are positioned right next to each other
  // Also I actually think that would cause the buttons to always rerender which is not what we want. So, yeah I actually think the array with blanks is the way to go.

  const insertItem = (index: number) => {
    return () => {
      console.log("Here");
      insert(index, createMockMarking({}));
    };
  };

  return (
    <div>
      {markingsFieldArray.map((marking, index) => (
        <Fieldset.Headless namespace={`markings[${index}]`} key={index}>
          {marking ? (
            <>
              <Select
                name="primary_mark"
                defaultValue={marking.primary_mark}
                className="font-mono w-[1ch] appearance-none indent-[1px]"
              >
                {available_marks.map((mark, index) => (
                  <option value={mark} key={index}>
                    {mark}
                  </option>
                ))}
              </Select>
              <Input name="type" defaultValue={marking.type} hidden />
            </>
          ) : (
            <button
              onClick={insertItem(index)}
              className="border-b-2 opacity-0 transition-opacity active:opacity-60 hover:opacity-100 hover:text-blue-400 hover:border-blue-400 font-mono"
            >
              +
            </button>
          )}
        </Fieldset.Headless>
      ))}
    </div>
  );
};
