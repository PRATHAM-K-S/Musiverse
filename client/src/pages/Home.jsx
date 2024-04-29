import axios from "axios";
import qs from "qs"
import React, { useContext, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AccessToken } from "../context/Context";

const Home = () => {
  const accesstoken = useContext(AccessToken);
  
  useEffect(() => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({
          grant_type: "client_credentials",
          client_id: "23d53b3a68cc4d728be235dd99f30334",
          client_secret: "75f89851a1684d06acf8200e62458121",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        accesstoken.setaccessToken(response.data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, []);
  return (
    <div className="w-full flex gap-2 flex-col justify-center relative items-center h-[85vh]">
      <h1 className="font-semibold text-3xl flex gap-2 text-white">
        Welcome to
        <span className="font-extrabold text-[#FFE500]">Musiverse</span>{" "}
      </h1>
      <p className="w-1/2 text-center  text-white opacity-75 font-extralight">
        Generate playlist based on what you love
      </p>
      <br />
      <Link to={"/tools/generate_playlist"}>
        {" "}
        <button className="bg-[#FF26C2] py-2 px-8 text-white rounded-3xl flex items-center gap-2 hover:bg-[#e217a8] hover:gap-3 transition-all">
          Generate Now <FaArrowRightLong className="mt-1" />
        </button>
      </Link>
    </div>
  );
};

export default Home;
