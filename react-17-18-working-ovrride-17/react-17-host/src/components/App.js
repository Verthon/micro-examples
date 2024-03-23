import React from "react";
import pkg from '../../package.json'
const RemoteButton = React.lazy(() => import("app2/Button"));
const Counter = React.lazy(() => import("app2/Counter").then(module => ({ default: module.Counter })));
const ReceivedProps = React.lazy(() => import("app2/ReceivedProps"));
const IdHook = React.lazy(() => import("app2/IdHook"));
export const App = () => {
  console.log(__webpack_share_scopes__)
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <div>APP HOST package.json react version {pkg.dependencies.react}</div>
      <div>React version: {React.version}</div>
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
      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <React.Suspense fallback="Loading Couner">
          <Counter />
        </React.Suspense>
      </div>

      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <React.Suspense fallback="Loading Couner">
          <ReceivedProps count={count}/>
        </React.Suspense>
      </div>


      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <React.Suspense fallback="Loading IdHook">
          <IdHook/>
        </React.Suspense>
      </div>
    </div>
  );
};
