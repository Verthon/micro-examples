import React from 'react';

import pkg from '../../package.json'
import {version} from "moment";
import { loadRemote, } from '@module-federation/enhanced/runtime';

const DateRemote_1 = React.lazy(() => loadRemote("remote1/DateRemote1"))
const DateRemote_2 = React.lazy(() => loadRemote("remote2/DateRemote2"))
const DateRemote_3 = React.lazy(() => loadRemote("remote3/DateRemote3"))

function App() {
  return (
    <>
      <div>
      <div>APP-Host</div>
      <div>Paczka uzyta moment: {version}</div>
      {/* <div>DATA: {fn.format('MMMM Do YYYY, h:mm:ss a')}</div> */}
      <div>
        isShared: <b>{`${pkg.isShared}`}</b>
      </div>
      ---------------------------------
      <div>
        <div
          style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
        >
          <React.Suspense fallback="Loading Button">
            <DateRemote_1 />
          </React.Suspense>
        </div>
      </div>
      <div>
        <div
          style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
        >
          <React.Suspense fallback="Loading Button">
            <DateRemote_2 />
          </React.Suspense>
        </div>
      </div>
      <div>
        <div
          style={{ border: "1px red solid", padding: "10px", margin: "20px 0" }}
        >
          <React.Suspense fallback="Loading Button">
            <DateRemote_3 />
          </React.Suspense>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
