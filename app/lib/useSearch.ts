import Fuse from "fuse.js";
import type { ChangeEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import debounce from "debounce";

export function useSearch<T>(list: T[], options?: Fuse.IFuseOptions<T>) {
  const [query, updateQuery] = useState("");

  const fuse = useMemo(() => new Fuse(list, options), [list, options]);

  // memoize results whenever the query or options change
  const results = useMemo(
    () => (!query ? list : fuse.search(query).map(({ item }) => item)),
    [fuse, query, list]
  );

  const setQuery = useCallback(debounce(updateQuery, 100), []);

  const onSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim()),
    [setQuery]
  );

  return {
    results,
    onSearch,
  };
}
