import React, { useEffect, useRef } from "react";
import mountIdHook from "app2/mountIdHook";
import mountCounter from "app2/mountCounter";
import mountButton from "app2/mountButton";


// const RemoteButton = React.lazy(() => import("app2/Button"));
// const counter = React.lazy(() => import("app2/Counter").then(module => ({ default: module.Counter })));
export const App = () => {
  const refHook = useRef(null)
  const refCounter = useRef(null)
  const refButton = useRef(null)

  useEffect(() => {
    mountIdHook(refHook.current)
    mountCounter(refCounter.current)
    mountButton(refButton.current)
  }, []);

  return (
    <div>
      <div>APP</div>
      <div>React version: {React.version}</div>
      ---------------------------------
      <div>
        <div
          style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
        >
          <React.Suspense fallback="Loading Button">
          <div ref={refButton}/>

          </React.Suspense>
        </div>
      </div>
      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <React.Suspense fallback="Loading Couner">
        <div ref={refCounter}/>

        </React.Suspense>
      </div>

      <div
        style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
      >
        <React.Suspense fallback="Loading IdHook">
          <div ref={refHook}/>
        </React.Suspense>
      </div>
    </div>
  );
};
