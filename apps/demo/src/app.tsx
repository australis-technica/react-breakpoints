import * as React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { WithBreakpoints, store as rbp } from "@australis/react-breakpoint";
/** */
const store = createStore(
  combineReducers({
    [rbp.STORE_KEY]: rbp
      .createReducer(
         /* initial state */
        /* breakpoints: [{ key: "xs", value: 0}], window: Window */
      ),
  }),
);
/** */
/** */
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <WithBreakpoints          
          children={state => {
            return (
              <div style={{ margin: "1rem" }}>
                <pre>State : {JSON.stringify(state, null, 2)}</pre>
              </div>
            );
          }}
        />
      </Provider>
    );
  }
}

export default App;
