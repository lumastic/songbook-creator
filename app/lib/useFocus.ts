import { useEffect, useState } from "react";

export function useFocus() {
  const [focusQuery, setFocusQuery] = useState<string | null>(null);

  useEffect(() => {
    if (!focusQuery) return;
    const element = document.querySelector<HTMLElement>(focusQuery);
    if (element) element.focus();
  }, [focusQuery]);

  return setFocusQuery;
}
