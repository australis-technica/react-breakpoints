export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl";
export type Breakpoint = { key: BreakpointKey; value: number };
/** */
export const defaultValues: Breakpoint[] = [
  { key: "xs", value: 0 },
  { key: "sm", value: 600 },
  { key: "md", value: 960 },
  { key: "lg", value: 1280 },
  { key: "xl", value: 1920 },
];
/** */
export function findBreakpoint(
  values: Breakpoint[] = defaultValues,
  win: Window = window,
): Breakpoint & { query: string} {
  for (let i = 0; i < values.length; i++) {
    const current = values[i];
    const next = values[i + 1];
    const query =
      `(min-width:${current.value}px)` +
      ((next && next.value && ` and (max-width:${next.value}px)`) || "");
    const { matches } = win.matchMedia(query);
    if (matches) return {...current, query};
  }
  return { key: undefined, value: undefined, query: undefined };
}
