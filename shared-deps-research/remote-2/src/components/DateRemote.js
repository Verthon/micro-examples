import React from "react";
import pkg from '../../package.json'
import moment from "moment";

const DateRemote = () => {
  return (
    <div>
      <div>REMOTE 2</div>
      MOMENT, package.json version: {pkg.dependencies.moment}
      <br />
      <div>Moment runtime version {moment.version}</div>
      <div>DATA: {moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
    </div>
  );
};

export default DateRemote;
