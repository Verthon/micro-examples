import * as React from "react";
export const ReceivedProps = ({ count }) => {
  return (
    <div>
      <div>REACT 18 host ReceiveProps with default export</div>
      <div>React version: {React.version}</div>
      <span>Count: {count}</span>
    </div>
  );
};

export default ReceivedProps;
