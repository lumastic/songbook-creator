import type { SubmitFunction } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

export function useAutoSave(submit: SubmitFunction, delay = 5 * 1000) {
  const formRef = useRef<HTMLFormElement>(null);
  const [lastUpdatedAt, setLastUpdated] = useState<Date>(new Date());
  const [formValues, setFormValues] = useState<FormData | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!formRef.current) return;
      const newValue = new FormData(formRef.current);
      if (!formValues) {
        setFormValues(newValue);
        return;
      }
      if (!compareFormDataEntries(formValues, newValue)) {
        setFormValues(newValue);
        setLastUpdated(new Date());
        submit(formRef.current, { replace: true });
      }
    }, delay);

    return () => clearInterval(timer);
  }, [formValues]);

  return { formRef, lastUpdatedAt };
}

function compareFormDataEntries(a: FormData, b: FormData): boolean {
  if (!a || !b) return false;
  const aValues = [...a.values()].join();
  const bValues = [...b.values()].join();

  return aValues === bValues;
}
