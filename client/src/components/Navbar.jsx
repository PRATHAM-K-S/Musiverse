import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaTools } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Userdetails } from "../context/Context";

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const userdetails = useContext(Userdetails)
  const [hamburger, sethamburger] = useState(false);

  return (
    <>
      <div className="relative border text-[#FF26C2] border-pink-400 px-6 py-3 bg-white/5 filter backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <RxHamburgerMenu
            onClick={() => {
              hamburger ? sethamburger(false) : sethamburger(true);
            }}
            className="text-2xl hover:text-[26px] transition-all cursor-pointer"
          />
          <Link to={"/"}>
            <span className="musiverse text-2xl text-center ml-14">
              Musiverse
            </span>
          </Link>
          {isAuthenticated && (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="bg-[#FF26C2] flex items-center text-white text-xs justify-center w-20 py-2 gap-2 pb-2 hover:bg-[#e217a8] hover:gap-3 transition-all rounded-3xl"
            >
              <span>Logout</span>
            </button>
          )}
          {isAuthenticated?
            userdetails.setuserdetails(user):<></>}
          {!isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-[#FF26C2] flex items-center text-white text-xs w-20 justify-center py-2 gap-2 pb-2 hover:bg-[#e217a8] hover:gap-3 transition-all rounded-3xl"
            >
              <span>Login</span>
              <FaArrowRightLong className="mt-1 cursor-pointer" />
            </button>
          )}
        </div>
        <div
          className={`h-[92vh] w-full ${
            hamburger ? "flex" : "hidden"
          } flex-col gap-2 justify-center items-center`}
        >
          <Link
            to={"/"}
            onClick={() => sethamburger(false)}
            className={`text-2xl text-white font-semibold flex gap-2 items-center hover:bg-white hover:text-[#e217a8] px-8 rounded-full py-2 transition-all`}
          >
            <IoHome />
            Home
          </Link>
          <Link
            to={"/tools"}
            onClick={() => sethamburger(false)}
            className={`text-2xl text-white font-semibold flex gap-2 items-center hover:bg-white hover:text-[#e217a8] px-8 rounded-full py-2 transition-all`}
          >
            <FaTools />
            Tools
          </Link>
          <Link
            to={"/profile"}
            onClick={() => sethamburger(false)}
            className={`text-2xl text-white font-semibold flex gap-2 items-center hover:bg-white hover:text-[#e217a8] px-8 rounded-full py-2 transition-all`}
          >
            <FaUserCircle />
            Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
