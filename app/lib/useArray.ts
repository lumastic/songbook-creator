import { useState } from "react";

export function useArray<T>(initialItems: T[]) {
  const [items, setItems] = useState(initialItems);

  const remove = (index: number) => {
    setItems((oldItems) => {
      oldItems.splice(index, 1);
      return oldItems;
    });
  };

  const insert = (index: number, item: T) => {
    setItems((oldItems) => {
      oldItems.splice(index, 0, item);
      return oldItems;
    });
  };

  const push = (item: T) => {
    setItems((oldItems) => {
      oldItems.push(item);
      return oldItems;
    });
  };

  const swap = (indexA: number, indexB: number) => {
    setItems((oldItems) => {
      [oldItems[indexA], oldItems[indexB]] = [
        oldItems[indexB],
        oldItems[indexA],
      ];
      return oldItems;
    });
  };

  return { items, remove, push, insert, swap };
}
