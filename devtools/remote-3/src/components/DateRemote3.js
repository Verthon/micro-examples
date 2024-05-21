import React, {useState} from "react";
import pkg from "../../package.json";
import moment from "moment";
const DateRemote = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>REMOTE 3</div>
      MOMENT, package.json version: {pkg.dependencies.moment}
      <div>
        isShared: <b>{`${pkg.isShared}`}</b>
      </div>
      <br />
      <div>Moment runtime version {moment.version}</div>
      <div>DATA: {moment().format("MMMM Do YYYY, h:mm:ss a")}</div>
      <div>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
        <div>Counter: {counter}</div>
        </div>  
    </div>
  );
};

export default DateRemote;
