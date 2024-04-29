import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet, Link } from "react-router-dom";
import {
  AccessToken,
  PlaylistName,
  PlaylistLink,
  PlaylistImage,
  Userdetails,
} from "./context/Context";
import { useContext } from "react";
import { User } from "@auth0/auth0-react";

const App = () => {
  const [playlistlink, setplaylistlink] = useState(useContext(PlaylistLink));
  const [accessToken, setaccessToken] = useState(useContext(AccessToken));
  const [playlistname, setplaylistname] = useState(useContext(PlaylistName));
  const [playlistimage, setplaylistimage] = useState(useContext(PlaylistImage));
  const [userdetails, setuserdetails] = useState(useContext(Userdetails));

  return (
    <div className="relative w-full h-screen bg-[#290B3B] overflow-hidden">
      <div className="absolute w-[100vw] h-[100vw] bg-[#6300B1] opacity-80 rounded-full -right-[40vw] -top-[5vh] filter blur-[120px] "></div>
      <div className="absolute w-[100vw] h-[100vw] bg-[#4E008C] opacity-80 rounded-full -left-[30vw] -bottom-[40vw] filter blur-[120px] "></div>
      <div className="absolute w-[100vw] h-[100vw] bg-[#FF00B8] opacity-80 rounded-full -left-[45vw] top-[50vw] filter blur-[150px] "></div>
      <div className="absolute w-[50vw] h-[50vw] bg-[#120020]  rounded-full left-16  filter blur-[120px] "></div>
      <div className="absolute w-[30vw] h-[50vw] -rotate-45 bg-[#FFFFFF]  rounded-full -right-[5vw] bottom-[50vw] filter blur-[150px] "></div>
      <div className="w-full h-screen bg-black/60 absolute"></div>
      <Userdetails.Provider value={{ userdetails, setuserdetails }}>
        <Navbar />
        <PlaylistImage.Provider value={{ playlistimage, setplaylistimage }}>
          <PlaylistName.Provider value={{ playlistname, setplaylistname }}>
            <PlaylistLink.Provider value={{ playlistlink, setplaylistlink }}>
              <AccessToken.Provider value={{ accessToken, setaccessToken }}>
                <Outlet />
              </AccessToken.Provider>
            </PlaylistLink.Provider>
          </PlaylistName.Provider>
        </PlaylistImage.Provider>
      </Userdetails.Provider>
    </div>
  );
};

export default App;
