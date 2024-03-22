import React, { useId } from "react";

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

export default IdHook;
