import React, { useId } from "react";
import ReactAdapterProvider from "./ReactAdapterProvider";

export const IdHook = () => {
  const id = useId();
  return (
    <div>
      REACT 18 host IdHook with default export
      <br />
      <div>Id: {id}</div>
    </div>
  );
};


export const Adapted= React.forwardRef((props, ref) => {
  return <ReactAdapterProvider {...props} component={IdHook} ref={ref} />;
});
