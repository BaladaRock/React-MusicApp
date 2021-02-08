import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ isToggled, setIsToggled }) => {
  return (
    <div className="navigation">
      <h1>Waves</h1>
      <button
        onClick={() => setIsToggled(!isToggled)}
        className="toggle-library"
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
};

export default Nav;
