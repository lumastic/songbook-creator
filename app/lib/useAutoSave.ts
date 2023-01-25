import type { SubmitFunction } from "@remix-run/react";
import { debounce } from "debounce";
import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoSave(submit: SubmitFunction, delay = 1500) {
  const formRef = useRef<HTMLFormElement>(null);
  const [lastUpdatedAt, setLastUpdated] = useState<Date>(new Date());
  const [hasUnsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData | null>(null);

  const save = useCallback(
    // Wait for a certain delay between changes before submitting the form
    debounce(() => {
      setLastUpdated(new Date());
      submit(formRef.current, { replace: true });
      setUnsavedChanges(false);
    }, delay),
    []
  );

  useEffect(() => {
    // Check if the form value has changed in the last second
    const timer = setInterval(() => {
      if (!formRef.current) return;
      const newValue = new FormData(formRef.current);
      setFormValues(newValue);
      // If this is our first render, return early.
      if (!formValues) return;
      // If the values of the old and new form value are different, save.
      if (!compareFormDataEntries(formValues, newValue)) {
        setUnsavedChanges(true);
        save();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [formValues, save]);

  return { formRef, lastUpdatedAt, hasUnsavedChanges };
}

function compareFormDataEntries(a: FormData, b: FormData): boolean {
  if (!a || !b) return false;
  const aValues = [...a.values()].join();
  const bValues = [...b.values()].join();

  return aValues === bValues;
}
