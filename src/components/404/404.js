import React from "react";
import { Link } from "react-router-dom";
import MainContainer from "../Container/Container";

function Error() {
  return (
    <MainContainer>
      <h1>404 - Page Not Found</h1>
      <Link className="btn btn-secondary" to="/">
        Got to Home
      </Link>
    </MainContainer>
  );
}

export default Error;
