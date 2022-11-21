import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
  return <Spinner animation="border" role="status" style={{ color:"#ED1D24" , width:"5rem",height:"5rem" }}></Spinner>;
};

export default LoadingSpinner;
