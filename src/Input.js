import React, { useState } from "react";
import OneWaySlab from "./pages/OneWaySlab";
import TwoWaySlab from "./pages/TwoWaySlab";
import { useNavigate } from "react-router-dom";
 
const Input = (props) => {
  const { length, breadth, setBreadth, setLength } =  props;
  const [slabType, setSlabType] = useState(null);
  const [submitted, setSubmitted] = useState(false);
 
  let navigate = useNavigate();
 
  console.log("Inoput: " + slabType);
 
  const handleLength = (e) => {
    setLength(e.target.value);
  };
 
  const handleBreadth = (e) => {
    setBreadth(e.target.value);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    lbRatio >= 2 ? navigate("/onewayslab") : navigate("/twowayslab");
    setSubmitted(true);
  };
 
  //lbRatio
  const lbRatio = length / breadth;
 
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "24px",
          alignItems: "center",
          backgroundColor: "lightgray"
        }}
      >
        <div style={{
 
        }} >
        <h1><i>Slab Design</i></h1>
        </div>
        <div >
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "lightgray",
              border: 'solid 2px black',
            borderRadius: "10px",
              padding: "24px",
              borderRadius: "10px",
              alignItems: "center",
              justifyContentL: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
 
            }}
          >
            <h2> Enter the Length and Breadth of your Slab </h2>
            <div className="mb-3" style={{ 
              paddingBottom: "16px"
            }} >
              <label htmlFor="length" className="form-label">
                Length
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
 
                value={length}
                onChange={handleLength}
 
              />
            </div>
 
            <div className="mb-3">
              <label htmlFor="breadth" className="form-label">
                Breadth
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
 
                value={breadth}
                onChange={handleBreadth}
              />
            </div>
 
            <button type="submit" className="btn btn-primary">
              Calculate
            </button>
          </form>
        </div>
 
 
      </div>
    </>
  );
};
 
export default Input;