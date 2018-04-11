import * as React from "react";
import { connect } from "react-redux";
import { selectors, State, STORE_KEY } from "./store";
import subscribe from "./listener";
import { Component, ComponentType } from "react";
const propTypes = require("prop-types");
/** */
export type PublicProps = {
  children(windowState: State): React.ReactNode;  
};
/** */
const WithBreakpoint: ComponentType<PublicProps> = connect(selectors.rawState)(
  class WithBreakpoint extends Component<
    PublicProps & State & { classes: any }
  > {
    static contextTypes = {
      store: propTypes.any,
    };
    unsubscribe: Function;
    componentDidMount() {
      const { breakpoints } = this.context.store.getState()[STORE_KEY] as State;
      this.unsubscribe = subscribe(
        this.context.store,
        this.props.breakpoints || breakpoints,
      );
    }
    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }
    render() {
      return this.props.children(this.props);
    }
  },
);
export default WithBreakpoint;
