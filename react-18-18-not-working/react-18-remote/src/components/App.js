import React from "react";
const RemoteButton = React.lazy(() => import("app2/Button"));
const Counter = React.lazy(() => import("app2/Counter").then(module => ({ default: module.Counter })));
const ReceivedProps = React.lazy(() => import("app2/ReceivedProps"));

export const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <div>APP</div>
      ---------------------------------
      <div>
        <div
          style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
        >
          <React.Suspense fallback="Loading Button">
            <RemoteButton />
          </React.Suspense>
        </div>
      </div>
      {/* <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <React.Suspense fallback="Loading Couner">
          <Counter />
        </React.Suspense>
      </div> */}

      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <React.Suspense fallback="Loading Couner">
          <ReceivedProps count={count}/>
        </React.Suspense>
      </div>
    </div>
  );
};
