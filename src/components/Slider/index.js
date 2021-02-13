//import packages from node modules
import React,{useState,useCallback,useEffect,useRef} from "react";
import PropTypes from "prop-types";

//import internals
import SliderPagination from "./pagination";
import Form from "../Form";

//import images
import arrowLeft from "../../images/arrow-left.svg";
import arrowRight from "../../images/arrow-right.svg";

export default function Slider(props){
  //define variables
  const {data,delay} = props;
  const [currentIndex,seCurrentIndex] = useState(0);
  const sliderInterval = useRef(0);

  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;
  const lastIndex = data.length - 1;

  const paginationData = [{
    label: "Previous Slide",
    callback: ()=>{
      clearInterval(sliderInterval);
      seCurrentIndex(prevIndex < 0 ? lastIndex: prevIndex);
    },
    image: arrowLeft
  },{
    label: "Next Slide",
    callback: ()=>{
      clearInterval(sliderInterval);
      seCurrentIndex(nextIndex > lastIndex ? 0 : nextIndex);
    },
    image: arrowRight
  }];

  //define functions
  const isShow = (index,slug="item") =>{
    return index === currentIndex?` slider__${slug}--show`:'';
  };


  //define callback functions
  const slideShowCallback = useCallback(()=> {
    seCurrentIndex(nextIndex > lastIndex ? 0 : nextIndex);
  },[nextIndex,lastIndex]);

  useEffect(() => {
    sliderInterval.current = setInterval(slideShowCallback, delay);
    return (() => {
      clearInterval(sliderInterval.current);
    })
  }, [slideShowCallback, delay]);

  //render
  const renderBackfroundImage = () => {
    if(data && data.length){
      return data.map((item,index)=>{
        const {image} = item;
        return(
            <div key={index} style={{
              backgroundImage: `url(${image})`
            }} className={`slider__item${isShow(index)}`}/>
        )
      });
    }
  };
  const renderTitle = () => {
    if(data && data.length){
      return data.map((item,index)=>{
        const {title} = item;
        return(
            <div key={index} className={`slider__title${isShow(index,"title")}`}>{title}</div>
        )
      });
    }
  };

  return (
      <div className={"slider"}>
        {renderBackfroundImage()}
        <div className={"slider__container container"}>
          <div className={"slider-title-list"}>
            {renderTitle()}
            <button onClick={e=>{
              e.preventDefault();
              document
                  .getElementById('form')
                  .scrollIntoView({ behavior: 'smooth' });
            }} className={"slider__button"}>Register</button>
          </div>
          <Form/>
        </div>
        <SliderPagination data={paginationData}/>
      </div>
  );
}

Slider.propTypes = {
  data: PropTypes.array,
  delay: PropTypes.number
};