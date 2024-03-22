import React, { useEffect } from 'react';
import ReactAdapterProvider from './ReactAdapterProvider';

export const Button = () => {
  useEffect(() => {
    console.log('Button mounted');
    return () => {
      console.log('Button unmounted');
    };
  }, []);
return ( <div>
    REACT 18 host Button with default export
    <br />
    <button>App 2 Button</button>
  </div>)
}



export const Adapted = React.forwardRef((props, ref) => {
  return <ReactAdapterProvider {...props} component={Button} ref={ref} />;
});
