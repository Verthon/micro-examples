import React from "react";
import {ReactAdapter} from "./ReactAdapterConsumer";

export const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <div>APP</div>
      <div>React version: {React.version}</div>
      ---------------------------------

      <div>
        <div
          style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
        >
          <ReactAdapter
          importer={() => import('app2/Button')}
          >
          </ReactAdapter>
        </div>
      </div>
      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <ReactAdapter
          importer={() => import('app2/Counter')}
          >
        </ReactAdapter>
      </div>

      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <ReactAdapter 
          importer={() => import('app2/ReceivedProps')}
          count={count}
          >
        </ReactAdapter>
      </div>


      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <ReactAdapter 
          importer={() => import('app2/IdHook')}
          >
        </ReactAdapter>
      </div>
    </div>
  );
};
