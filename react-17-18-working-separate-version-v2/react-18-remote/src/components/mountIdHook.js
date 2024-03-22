import React, { useId } from "react";
import { createRoot } from "react-dom/client";

const IdHook = () => {
  const id = useId();
  return (
    <div>
      REACT 18 host IdHook with default export
      <br />
      <div>Id: {id}</div>
    </div>
  );
};

export default function(el){
  const root = createRoot(el);
  root.render(<IdHook />);
};
