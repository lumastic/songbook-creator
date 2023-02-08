import { useState } from "react";

export function useArray<T>(initialItems: T[]) {
  const [items, setItems] = useState(initialItems);

  const remove = (index: number) => {
    setItems((oldItems) => {
      const items = [...oldItems];
      items.splice(index, 1);
      return items;
    });
  };

  const insert = (index: number, item: T) => {
    setItems((oldItems) => {
      const items = [...oldItems];
      items.splice(index, 0, item);
      return items;
    });
  };

  const replace = (index: number, item: T) => {
    setItems((oldItems) => {
      const items = [...oldItems];
      items.splice(index, 1, item);
      return items;
    });
  };

  const update = (index: number, item: Partial<T>) => {
    setItems((oldItems) => {
      const items = [...oldItems];
      items.splice(index, 1, { ...items[index], ...item });
      return items;
    });
  };

  const push = (item: T) => {
    setItems((oldItems) => {
      const items = [...oldItems];
      items.push(item);
      return items;
    });
  };

  const findIndex = (predicate: (value: T) => unknown) => {
    return items.findIndex(predicate);
  };

  const swap = (indexA: number, indexB: number) => {
    setItems((oldItems) => {
      const items = [...oldItems];
      [items[indexA], items[indexB]] = [items[indexB], items[indexA]];
      return items;
    });
  };

  return { items, remove, push, replace, insert, swap, findIndex, update };
}
