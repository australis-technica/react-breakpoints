import { Store } from "redux";
import { actions } from "./store";
import { findBreakpoint, Breakpoint } from "./breakpoints";
/** */
export default function subscribe(
  store: Store<{}>,
  values: Breakpoint[],
  win: Window = window,
) {
  const listener = () => {
    const { query, ...breakpoint } = findBreakpoint(values, window);
    store.dispatch(
      actions.setState({
        breakpoint,
        query,
      }),
    );
  };
  window.addEventListener("resize", listener);
  return () => window.removeEventListener("resize", listener);
}
