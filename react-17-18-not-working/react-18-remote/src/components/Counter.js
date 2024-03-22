import React from 'react';
export const  Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
    REACT 18 host Counter with named export
    <div>React version: {React.version}</div>
<br />
      <span>Count: {count}</span>
      <br />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
