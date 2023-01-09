import type { Setlist } from "@prisma/client";
import { Form } from "@remix-run/react";
import { forwardRef } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Textarea } from "~/components/Textarea";

const SetlistForm = forwardRef<
  HTMLFormElement,
  { setlist?: Setlist; form?: typeof Form; close: () => void }
>(({ setlist, form, close }, ref) => {
  const FormComponent = form || Form;
  return (
    <FormComponent data-testid="setlistform" ref={ref} className="space-y-3">
      <div className="space-y-1">
        <label className="uppercase text-xs font-medium text-stone-400">
          Name
        </label>
        <Input
          name="name"
          defaultValue={setlist?.name}
          placeholder="Name"
          className="border border-stone-200 px-4 py-3 rounded-md focus:border-stone-400"
        />
      </div>
      <div className="space-y-1">
        <label className="uppercase text-xs font-medium text-stone-400">
          Description <span className="font-normal">(optional)</span>
        </label>
        <Textarea
          name="description"
          placeholder="Description"
          className="border border-stone-200 px-4 py-3 rounded-md focus:border-stone-400"
        />
      </div>
      <div>
        <div className="flex items-center mt-6">
          <div className="flex-1">
            <Button onClick={close} size="lg" variant="text">
              Cancel
            </Button>
          </div>
          <Button type="submit" size="lg">
            Save
          </Button>
        </div>
      </div>
    </FormComponent>
  );
});

SetlistForm.displayName = "SetlistForm";

export { SetlistForm };
