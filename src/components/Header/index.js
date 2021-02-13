//import packages from node modules
import React from "react";

//import shared components
import Logo from "../Logo";
import Navigation from "../Navigation";

export default function Header(props){

 return(
     <header className={"header"}>
       <div className={"header__strip"} />
       <div className={"header__main"}>
         <div className={"container header__container"}>
           <Logo className={"header__logo"} />
           <Navigation className={"header__navigation"}/>
         </div>
       </div>
     </header>
 )
}