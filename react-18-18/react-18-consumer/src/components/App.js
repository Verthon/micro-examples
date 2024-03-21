import React from 'react';
const RemoteButton = React.lazy(() => import('app2/Button'));
// const Counter = React.lazy(() => import('app2/Counter'));

export const App = () => {
  return <div><div>
    APP
    </div>
    ---------------------------------
    <div>
    <div style={{ border: '1px red solid', padding: '10px', margin: '20px 0' }}>
          <React.Suspense fallback="Loading Button">
            <RemoteButton />
          </React.Suspense>
        </div>

        {/* <React.Suspense fallback="Loading Couner">
            <Counter />
          </React.Suspense> */}
    </div>
  </div>
}