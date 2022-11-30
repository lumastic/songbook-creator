import { Fieldset, Select } from "@/lib/fieldset";
import { ILine } from "@/types/song";
import { lineToMarkFieldArrayItems } from "~/helpers/lineToMarkFieldArrayItems";

type Props = {
  line: ILine;
};

export const MarkingsFieldArray: React.FC<Props> = ({ line }) => {
  const markingsFieldArray = lineToMarkFieldArrayItems(line);
  // Instead, maybe just do kind of what I'm doing for spaces and add an amount of + buttons equal to the difference in indentation
  // Also, if it's the last element, always add one at the end.

  // Mmmm I actually don't think that handles the case very well where you want to swap the chords that are positioned right next to each other
  // Also I actually think that would cause the buttons to always rerender which is not what we want. So, yeah I actually think the array with blanks is the way to go.
  return (
    <Fieldset.Headless namespace="markings">
      {markingsFieldArray.map((marking, index) => {
        if (!marking) return <button>+</button>;
        return (
          <Select name="primary_mark" key={marking.id}>
            <option value={marking.primary_mark}>{marking.primary_mark}</option>
          </Select>
        );
      })}
    </Fieldset.Headless>
  );
};
