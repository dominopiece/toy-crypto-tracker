import React from "react";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      setup
      <Outlet />
    </div>
  );
}

export default Root;
