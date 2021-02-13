//import packages from node modules
import React from "react";
import PropTypes from "prop-types";

export default function NavigationList(props){
  const {list} = props;

  const renderItem = () =>{
    if(list && list.length){
      return list.map((item,index)=>{
        const {label,icon,url} = item;
        return (
            <li key={index}>
              <a href={url}>
                <img src={icon} alt={label} />
                <span className={"navigation-list__label"}>{label}</span>
              </a>
            </li>
        )
      })
    }
  }

  return (
      <ul className={"navigation-list"}>
        {renderItem()}
      </ul>
  )
};

NavigationList.propTypes = {
  list: PropTypes.array
};