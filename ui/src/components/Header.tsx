import React from "react";
import "./header.css";
import logo from "./../assets/logo.svg";
import { Link } from "react-router-dom";
import  { GiHamburgerMenu }  from "react-icons/gi"
// require("svg-url-loader!./../assets/logo.svg");
import {useAppSelector, useAppDispatch} from "./../hooks"
import { UserLogout } from "../Store/Action/AuthActions";

const Header = () => {
  const isauthenticated = useAppSelector(state => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()
  
  const LogoutHandler  = () => {
    dispatch(UserLogout())
  }

  return (
    <div className="bg-white px-2 sm:px-0">
      
    <div className="w-full flex mx-auto  container py-2  px-4">
      
      <div className="w-fit  mr-4 my-auto"><img  src={logo}  className = 'w-8  sm:w-8'/></div>
    
      <div className="hidden sm:block">
        <ul  className="flex items-center h-full text-lg gap-4">
          <li>
            Home{" "}
            <ul>
              <li></li>
            </ul>
          </li>
          <li>Doctors</li>
          <li>Patients</li>
        </ul>
      </div>

      <div className="ml-auto  flex  items-center gap-4">
        <div className="hidden sm:block">
          <h3>Contact</h3>
          <h3 className="text-left">+2349037183645</h3>
        </div>
        {!isauthenticated?
        <Link to={"/Login"}>
          <div className="border-2 border-blue-900 text-blue-900 py-[0.3rem]  hover:bg-blue-900  hover:text-white px-2 cursor-pointer">LOGIN / SIGNUP</div>
        </Link>:
        <>
        <div className="border-2 border-blue-900 text-blue-900 py-[0.3rem]  hover:bg-blue-900  hover:text-white px-2 cursor-pointer" onClick={() => LogoutHandler()}>LOGOUT</div>
      </>
}

      </div>
      <div className="ml-2 sm:hidden cursor-pointer"><GiHamburgerMenu fontSize={'3rem'}  color  = 'rgb(30 58 138)'  /></div>
    </div>
    </div>
  );
};

export default Header;