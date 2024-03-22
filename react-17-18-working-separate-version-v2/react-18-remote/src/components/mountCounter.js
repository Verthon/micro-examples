import React from 'react';
import { createRoot } from 'react-dom/client';
export const  Counter = () => {
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
}

export default function(el){
  const root = createRoot(el);
  root.render(<Counter />);
};
