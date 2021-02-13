//import packages from node modules
import React from "react";

//import images
import slide1 from "../../images/slide-1.png";
import slide2 from "../../images/slide-2.jpg";
import slide3 from "../../images/slide-3.jpeg";
import slide4 from "../../images/slide-4.jpg";

//import shared components
import Slider from "../Slider";

export default function Banner(){
  const sliderData = [{
    title: "Two stunning new Townhome Releases Launching Early 2021",
    image: slide1,
  },{
    title: "One stunning new Townhome Releases Launching Early 2022",
    image: slide2,
  },{
    title: "Three stunning new Townhome Releases Launching Early 2023",
    image: slide3,
  },{
    title: "Five stunning new Townhome Releases Launching Early 2025",
    image: slide4,
  }]
  return(
      <section className={"banner"}>
        <Slider data={sliderData} delay={3000}/>
      </section>
  )
}