//import packages from node modules
import React from "react";
import PropTypes from "prop-types";

export default function SliderPagination (props){
  const {data} = props;

  //render

  const renderPaginationItem = () => {
    return data.map((item,index)=>{
      const {callback,image,label} = item;
      return (<button className={"slider-pagination__button"} key={index} onClick={e=>{
        e.preventDefault();
        callback();
      }}>
        <img src={image} alt={label} />
      </button>)
    })
  };

  //on tablet screen the pagination might overlap with the title
  //we need to get title height and move the pagination dynamically (not just hardcoded from css file)

  const getCurrentSliderItemTitleHeight = () => {
    const title = document.querySelector(".slider__item--show .slider__title");
    return title && title.offsetHeight ? title.offsetHeight : 480;
  };

  const currentTitleHeight = getCurrentSliderItemTitleHeight();

  const isSmallTablet = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    return windowHeight < 800 && windowWidth>=1200 && currentTitleHeight
  };

  const getCurrentMarginTop = () => {
      return isSmallTablet() ? (currentTitleHeight/2) + 50 : null
  };

  return (
      <div className={`slider-pagination${isSmallTablet()?' slider-pagination--small-tablet':''}`} style={isSmallTablet()?{
        marginTop: getCurrentMarginTop()
      }:null}>
        <div className={"container slider-pagination__container"}>
          {renderPaginationItem()}
        </div>
      </div>
  )

};

SliderPagination.propTypes = {
  data: PropTypes.array
};