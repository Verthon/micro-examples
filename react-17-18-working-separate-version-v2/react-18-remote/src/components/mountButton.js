import React from 'react';
import { createRoot } from 'react-dom/client';

const Button = () => {
return ( <div>
    REACT 18 host Button with default export
    <br />
    <button>App 2 Button</button>
  </div>)
}


export default function(el){
  const root = createRoot(el);
  root.render(<Button />);
};
