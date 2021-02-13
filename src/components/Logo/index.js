//import packages from node modules
import React from "react";
import PropTypes from "prop-types";

//import utility functions
import {extendClassName} from "../../utilities/functions/common";

//import images
import LogoImage from "../../images/logo.png";

export default function Logo(props) {
  const {className} = props;
  return (
      <a className={`logo${extendClassName(className)}`} href={"/"}>
        <img src={LogoImage} alt={"Eliston"} className={"logo__image"}/>
      </a>
  );
}

Logo.propTypes = {
  className: PropTypes.string
};
