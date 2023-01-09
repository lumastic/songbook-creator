import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(true);
  function close() {
    if (window)
      window.location.href = window.location.href.replace(location.search, "");
    setIsOpen(false);
  }

  return { isOpen, close };
}
