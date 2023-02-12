import { renderHook, act } from "@testing-library/react";
import { useArray } from "./useArray";

test("can render initial items", () => {
  const { result } = renderHook(() => useArray([]));

  expect(result.current.items).toMatchObject([]);
});

test("can push items", () => {
  const { result } = renderHook(() => useArray([0]));

  act(() => {
    result.current.push(1);
  });

  expect(result.current.items[1]).toBe(1);
});

test("can insert items", () => {
  const { result } = renderHook(() => useArray([0, 1, 2]));

  act(() => {
    result.current.insert(1, 3);
  });

  expect(result.current.items).toMatchObject([0, 3, 1, 2]);
});

test("can swap items", () => {
  const object1 = { key: "value1" };
  const object2 = { key: "value2" };
  const { result } = renderHook(() => useArray([object1, object2]));
  expect(result.current.items[0]).toBe(object1);
  expect(result.current.items[1]).toBe(object2);

  act(() => {
    result.current.swap(0, 1);
  });

  expect(result.current.items[0]).toBe(object2);
  expect(result.current.items[1]).toBe(object1);
});

test("can delete items", () => {
  const { result } = renderHook(() => useArray([0, 1]));
  expect(result.current.items[0]).toBe(0);
  expect(result.current.items[1]).toBe(1);

  act(() => {
    result.current.remove(0);
  });

  expect(result.current.items[0]).toBe(1);
  expect(result.current.items.length).toBe(1);
});

test("can findIndex", () => {
  const { result } = renderHook(() => useArray([{ id: 0 }, { id: 1 }]));

  expect(result.current.findIndex((value) => value.id === 0)).toBe(0);
  expect(result.current.findIndex((value) => value.id === 1)).toBe(1);

  act(() => {
    result.current.insert(1, { id: 3 });
  });

  expect(result.current.findIndex((value) => value.id === 3)).toBe(1);
});

test("can update object", () => {
  const { result } = renderHook(() =>
    useArray([
      { id: 0, value: 0 },
      { id: 1, value: 1 },
    ])
  );

  act(() => {
    result.current.update(1, { value: 2 });
  });

  expect(result.current.items[1]).toMatchObject({ id: 1, value: 2 });
});
