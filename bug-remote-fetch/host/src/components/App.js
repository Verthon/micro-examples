import React from "react";
import * as moment from "moment";
const DateRemote_1 = React.lazy(() => import("remote1/DateRemote"));
const DateRemote_2 = React.lazy(() => import("remote2/DateRemote"));
const DateRemote_3 = React.lazy(() => import("remote3/DateRemote"));

export const App = () => {
  console.log(__webpack_share_scopes__)
  return (
    <div>
      <div>APP-Host</div>
      <div>Paczka uzyta moment: {moment.version}</div>
      <div>DATA: {moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
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
  );
};
