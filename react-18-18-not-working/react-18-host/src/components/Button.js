import React from 'react';

const Button = () => {
const [count, setCount] = React.useState(0);
return ( <div>
    REACT 18 host component
    <br />
    <button>App 2 Button</button>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <span>Count: {count}</span> 
  </div>)
}

export default Button;
