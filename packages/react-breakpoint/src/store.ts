import { FluxStandardAction } from "flux-standard-action";
import { Reducer } from "redux";
import { findBreakpoint, Breakpoint, defaultValues } from "./breakpoints";
/** */
export type State = {
  breakpoint: Breakpoint;
  breakpoints: Breakpoint[],
  query: string;
};
/** */
export const STORE_KEY = "breakpoints";
/** */
export const actionTypes = {
  SET_STATE: `${STORE_KEY}/set-state`,
};
/** */
const setState = (
  payload: Partial<State>,
): FluxStandardAction<Partial<State>> => ({
  type: actionTypes.SET_STATE,
  payload,
  meta: undefined,
});
/** */
export const actions = {
  setState,
};
/** */
type Payload = Partial<State>;

export const createReducer: (
  breakpoints?: Breakpoint[],
  win?: Window,
) => Reducer<State> = (breakpoints, win) => {
  const { query, ...breakpoint } = findBreakpoint(breakpoints, win);
  const defaultState = {
    breakpoint,
    query,
    breakpoints: breakpoints || defaultValues,
  };
  const reducer = <A extends FluxStandardAction<Payload>>(
    state = defaultState,
    action: A,
  ) => {
    switch (action.type) {
      case actionTypes.SET_STATE: {
        return Object.assign({}, state, action.payload);
      }
      default:
        return state;
    }
  };
  return reducer;
};
/** */
export const selectors = {
  rawState: (state: { [key: string]: any }) => state[STORE_KEY] as State,
};
