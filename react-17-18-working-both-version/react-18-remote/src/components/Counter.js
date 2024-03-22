import React from "react";
import ReactAdapterProvider, {ReactAdapter} from "./ReactAdapterProvider";

export const Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      REACT 18 host Counter with named export
      <br />
      <span>Count: {count}</span>
      <br />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export const Adapted = React.forwardRef((props, ref) => {
  return <ReactAdapterProvider {...props} component={Counter} ref={ref} />;
});
