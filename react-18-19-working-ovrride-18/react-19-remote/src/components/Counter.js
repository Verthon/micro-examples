import React from 'react';
export const  Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
    REACT 19 host Counter with named export
<br />
      <span>Count: {count}</span>
      <br />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
