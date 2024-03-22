import * as React from "react";
import ReactAdapterProvider from "./ReactAdapterProvider";

const ReceivedPropsA = ({ count }) => {
  return (
    <div>
      <div>REACT 18 host ReceiveProps with default export</div>
      <span>Count: {count}</span>
    </div>
  );
};

export const Adapted = React.forwardRef((props, ref) => {
  return <ReactAdapterProvider {...props} component={ReceivedPropsA} ref={ref} />;
});
