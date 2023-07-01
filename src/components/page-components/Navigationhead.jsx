import React from "react";
import "./Navigationhead.scss";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navigationhead = () => {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <nav>
      <div className="nav_wrapper">
        <div className="left-nav">Movie-DB</div>
        <div className="right-nav">
          <ul>
            <li className={splitLocation[1] === "" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={splitLocation[1] === "add" ? "active" : ""}>
              <Link to="/add">Add Movie</Link>
            </li>
            {/* <li>
                    <a href=""></a>
                </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigationhead;
