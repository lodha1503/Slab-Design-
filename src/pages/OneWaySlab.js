import React from "react";
 
const OneWaySlab = (props) => {
  const cement = props.length * props.breadth * 0.125 * 8;
  var flag = 0;
  const choose_positive_min = (value1, value2) => {
    if (value1 >= 0 && value2 >= 0) {
      return Math.min(value1, value2);
    } else if (value1 >= 0) {
      return value1;
    } else if (value2 >= 0) {
      return value2;
    }
 
    return -1;
  };
 
  const find_lowest_nearest_multiple_of_10 = (num) => {
    var nearest_multiple;
    nearest_multiple = Math.floor(num / 10);
    nearest_multiple = nearest_multiple * 10;
 
    return nearest_multiple;
  };
 
  const Interpolation = (Assume_tensionsteel, pt_percentage, y) => {
    var len = y.length;
    var ans = y[len - 1];
    for (let i = 1; i < len; i++) {
      if (
        Assume_tensionsteel >= pt_percentage[i - 1] &&
        Assume_tensionsteel < pt_percentage[i]
      ) {
        ans =
          ((y[i] - y[i - 1]) / (pt_percentage[i] - pt_percentage[i - 1])) *
            (Assume_tensionsteel - pt_percentage[i - 1]) +
          y[i - 1];
 
        break;
      }
    }
 
    return ans;
  };
 
  const Long_Span = props.length;
  const Short_Span = props.breadth;
  const Live_Load = 3;
  const Dead_Load = 1;
 
  const Floor_Finish = 1;
 
  const D = Short_Span / 28;
  const Effective_depth = Math.round(D * 1000);
 
  const Total_depth = Effective_depth + 20;
  var Maximum_spacing = Math.min(3 * Total_depth, 300);
 
  const width = 300; // Given
 
  const shorter_effectivespan1 = Short_Span * 1000 + width;
  const longer_effectivespan1 = Long_Span * 1000 + width;
  const shorter_effectivespan2 = Effective_depth + Short_Span * 1000;
  const longer_effectivespan2 = Effective_depth + Long_Span * 1000;
 
  const shorter_effectivespan = Math.min(
    shorter_effectivespan1,
    shorter_effectivespan2
  );
  const longer_effectivespan = Math.min(
    longer_effectivespan1,
    longer_effectivespan2
  );
 
  const Self_weight = 25 * 1 * (Total_depth / 1000);
 
  const Total_Load = Live_Load + Dead_Load + Self_weight + Floor_Finish;
 
  const Factored_Load = 1.5 * Total_Load;
  const Factored_Moment =
    (Factored_Load * Math.pow(shorter_effectivespan / 1000, 2)) / 8;
  const Factored_shearforce =
    (Factored_Load * (shorter_effectivespan / 1000)) / 2;
 
  const Concrete_grade = 20;
  const Steel_Strength = 415;
 
  const d = Math.sqrt(
    (Factored_Moment * 1000000) / (0.1379 * 1000 * Concrete_grade)
  );
 
  //Variables
 
  var a,
    b,
    c,
    discriminant,
    root1,
    root2,
    Area_required,
    dia,
    area_of_bar,
    no_of_bar,
    number,
    spacing,
    Spacing,
    Area_Provided,
    Min_area_req,
    fs,
    pt,
    kt,
    x,
    tau,
    Assume_tensionsteel,
    y_value,
    s,
    spacing_prov,
    development_length,
    Length_of_embedment,
    embedded_length;
 
  const Tbd = 1.2,
    wall_width = 300;
 
  const pt_percentage = [
    0.15, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3,
  ];
  const y = [
    0.28, 0.36, 0.48, 0.56, 0.62, 0.67, 0.72, 0.75, 0.79, 0.81, 0.82, 0.82,
    0.82,
  ];
 
  console.log(props.length, props.breadth);
 
  if (Effective_depth > d) {
    a = (Math.pow(Steel_Strength, 2) * 0.87) / (Concrete_grade * 1000);
    b = -(Steel_Strength * 0.87 * Effective_depth);
    c = Factored_Moment * 1000000;
 
    discriminant = Math.pow(b, 2) - 4 * a * c;
 
    if (discriminant < 0) {
      root1 = -b / (2 * a);
      root2 = -b / (2 * a);
    } else {
      root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    }
 
    Area_required = choose_positive_min(root1, root2);
 
    if (Area_required > 0) {
      dia = 10;
      area_of_bar = (3.14 * Math.pow(dia, 2)) / 4;
      no_of_bar = Area_required / area_of_bar + 1;
      number = Math.round(no_of_bar);
      spacing = 1000 / number;
      Spacing = find_lowest_nearest_multiple_of_10(spacing);
 
      if (Maximum_spacing >= Spacing) {
        Area_Provided = (1000 / Spacing) * area_of_bar;
        Min_area_req = 0.0012 * Total_depth * 1000;
 
        if (Area_Provided >= Min_area_req && Area_Provided >= Area_required) {
          fs = (0.58 * Steel_Strength * Area_required) / Area_Provided;
          pt = (Area_Provided / (1000 * Total_depth)) * 100;
          kt = 1 / (0.225 + 0.00322 * fs - 0.625 * Math.log10(1 / pt));
          x = 20 * kt;
 
          if (x >= Short_Span / D) {
            tau = (Factored_shearforce * 1000) / (1000 * Total_depth);
            Assume_tensionsteel = pt / 2;
            y_value = Interpolation(Assume_tensionsteel, pt_percentage, y);
 
            if (y_value >= tau) {
              s = Math.min(5 * Effective_depth, 450);
 
              if (s >= Spacing) {
                spacing_prov = Math.floor(Spacing / 10) * 10;
 
                development_length =
                  (0.87 * Steel_Strength * dia) / (4 * 1.6 * Tbd);
                console.log(development_length);
 
                embedded_length = development_length / 3;
                Length_of_embedment = wall_width - 30;
                if (Length_of_embedment > embedded_length) {
                  flag = 1;
                } else {
                  alert(Length_of_embedment < embedded_length);
                }
              } else {
                alert("s<Spacing");
              }
            } else {
              alert("y_value<tau");
            }
          } else {
            alert("x < Short_Span/D");
          }
        } else {
          if (Area_Provided < Min_area_req && Area_Provided < Area_required) {
            alert("Area_Provided<Min_area_req && Area_Provided<Area_required");
          } else if (Area_Provided < Min_area_req) {
            alert("Area_Provided<Min_area_req");
          } else if (Area_Provided < Area_required) {
            alert("Area_Provided<Area_required");
          }
        }
      } else {
        alert("Maximum Spacing is less than Spacing");
      }
    } else {
      alert("Required Area is negative");
    }
  } else {
    alert("EFFECTIVE_DEPTH EXCEEDS D");
  }
 
  return (
    <>
     
      <div style={{ 
          diplay: "flex",
          flexDirection: "column",
          justifyContent:"center",
          alignItems: "center",
          backgroundColor: "lightgray"
          
        }} >
           <div style={{
            padding: "20px",
 
            display: "flex",
            justifyContent: "center"
           }} >
           <h1><i>One Way Slab</i> </h1>
           </div>
          
      {flag === 1 ? (
        
        
 
        
 
          <div style={{ 
            diplay: "flex",
            border: 'solid 2px black',
            borderRadius: "10px",
            flexDirection: "column",
            justifyContent:"center",
            alignItems: "center",
            backgroundColor: "lightgray",
            maxWidth: "600px",
            position: "absolute",
            padding: "30px",
            fontSize: "1.2vw",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }} >
            <p>
              {" "}
              <b>Number of Reinforcement Bars Provided </b> : {number}
            </p>
            <p>
              <b>Area of Reinforcement Provided is</b> : {Area_Provided} mm2 <br />{" "}
              
            </p>
            <p>
              {" "}
              <b>Cement Required</b> : {cement} bags
            </p>
          </div>
         
        
      ) : (
        ""
      )}
       </div>
    </>
  );
};
 
export default OneWaySlab;