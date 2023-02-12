import type { Setlist } from "@prisma/client";
import { Form } from "@remix-run/react";
import { forwardRef } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Textarea } from "~/components/Textarea";

const SetlistForm = forwardRef<
  HTMLFormElement,
  { setlist?: Setlist; form?: typeof Form; close?: () => void; action?: string }
>(({ setlist, form, close, action }, ref) => {
  const FormComponent = form || Form;
  return (
    <FormComponent
      method="post"
      action={action}
      data-testid="setlistform"
      ref={ref}
      className="space-y-3"
    >
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase text-neutral-400">
          Name
        </label>
        <Input
          name="name"
          defaultValue={setlist?.name}
          placeholder="Rapunzels 10/9/23"
          autoFocus
          className="rounded-md border border-neutral-200 px-4 py-3 focus:border-neutral-400"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase text-neutral-400">
          Description <span className="font-normal">(optional)</span>
        </label>
        <Textarea
          name="description"
          defaultValue={setlist?.description}
          placeholder="An all sea shanty show in honor of Lief Erickson Day."
          className="rounded-md border border-neutral-200 px-4 py-3 focus:border-neutral-400"
        />
      </div>
      <div>
        <div className="mt-6 flex items-center">
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
