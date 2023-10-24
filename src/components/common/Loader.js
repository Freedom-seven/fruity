import React from "react";
import "../../styles/Loader.css"; // Make sure to import your CSS styles

function Loader() {
  return (
    <div className="loader">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="reach">
          <div></div>
        </div>
      ))}
    </div>
  );
}

export default Loader;
