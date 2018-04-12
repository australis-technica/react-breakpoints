import * as React from "react";
import { render } from "react-dom";
import { WithBreakpoints, store as bps } from "../lib";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
/** */
const store = createStore(
  combineReducers({
    [bps.STORE_KEY]: bps.createReducer(),
  }),
);
/** */
describe("react-breakpoints", () => {
  it("works", () => {
    const div = document.createElement("div");
    let span: HTMLSpanElement;
    render(
      <Provider store={store}>
        <WithBreakpoints
          children={state => (
            <span ref={x => (span = x)}>{JSON.stringify(state)}</span>
          )}
        />
      </Provider>,
      div,
    );
    expect(span.innerHTML).toBe(
      JSON.stringify(bps.selectors.rawState(store.getState())),
    );
  });
});
