//import packages from node modules
import React from "react";

//import utility functions
import {extendClassName} from "../../utilities/functions/common";

//import icons
import MapIcon from "../../images/map.svg";
import PhoneIcom from "../../images/phone.svg";

//import internals
import NavigationList from "./list";

//main component
export default function Navigation(props) {
  const {className} = props;
  const list = [{
    label: "Visit Our Sales Centre",
    icon: MapIcon,
    url: "#"
  },{
    label: "1300 354 786",
    icon: PhoneIcom,
    url: "tel: 1300354786"
  }];
  return(
      <nav className={`navigation${extendClassName(className)}`}>
        <NavigationList list={list} />
      </nav>
  )
};