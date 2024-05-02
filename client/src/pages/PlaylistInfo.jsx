import React, { useContext, useEffect, useState } from "react";
import {
  AccessToken,
  PlaylistImage,
  PlaylistLink,
  PlaylistName,
} from "../context/Context";
import axios from "axios";
import { RiSpotifyLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const PlaylistInfo = () => {
  const playlisturl = useContext(PlaylistLink); //{playlisturl.playlistlink}
  const accesstoken = useContext(AccessToken); //{accesstoken.accessToken}
  const [tracks, settracks] = useState(null);
  const playlistname = useContext(PlaylistName);
  const playlistimage = useContext(PlaylistImage);

  useEffect(() => {
    axios
      .get(playlisturl.playlistlink, {
        headers: {
          Authorization: `Bearer ${accesstoken.accessToken}`,
        },
      })
      .then((response) => {
        settracks([response.data]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : "Unknown error"
        );
      });
  }, []);

  return (
    <div className="text-white relative overflow-y-auto h-[90vh]">
      <br />
      <div className="ml-[5vw] mb-4 flex">
        <img
          className="max-w-40 w-[20vw] rounded-lg"
          src={playlistimage.playlistimage}
          alt=""
        />
        <div className="w-full flex flex-col gap-6">
          <h3 className="ml-[5vw] text-2xl font-bold">
            {playlistname.playlistname}
          </h3>
          <div className="bg-[#ff26c2] flex justify-center text-sm items-center h-8 ml-[5vw] w-40 rounded-md mb-2">
            <Link to={"/tools/generate_playlist/"}>Get new playlist</Link>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden  items-center flex flex-col">
        {tracks == null
          ? console.log("null")
          : tracks[0].items.map((item) => {
              return (
                <div
                  key={item.track.id}
                  className="w-[90vw] border items-center border-white/10 mt-4 flex p-2 rounded-md bg-white/5 filter backdrop-blur-lg  hover:bg-white/15 transition-all cursor-pointer"
                >
                  <img
                    src={item.track.album.images[0].url}
                    alt=""
                    className="w-12 rounded-sm"
                  />
                  <div className="w-full ml-4">
                    <h3 className="font-semibold text-xs">{item.track.name}</h3>
                    {item.track.artists.map((artist) => {
                      return (
                        <span className="text-xs ml-1 text-gray-400">
                          {artist.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-1 w-full ml-14">
                    <p className="text-xs text-gray-400">
                      {item.track.album.name}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-end items-center w-full">
                    <div
                      id={item.track.id}
                      onClick={(e) => {
                        document.getElementById(e.currentTarget.id).children[1]
                          .paused == true
                          ? (document
                              .getElementById(e.currentTarget.id)
                              .children[1].play(),
                            (document.getElementById(
                              e.currentTarget.id
                            ).children[0].innerHTML = "Pause"))
                          : (document
                              .getElementById(e.currentTarget.id)
                              .children[1].pause(),
                            (document.getElementById(
                              e.currentTarget.id
                            ).children[0].innerHTML = "Play"),
                            (document.getElementById(
                              e.currentTarget.id
                            ).children[1].currentTime = 0));
                      }}
                    >
                      {" "}
                      <button className="border-2 border-[#ff26c2] rounded-full px-4 py-1 font-semibold text-xs hover:bg-[#ff26c2] hover:text-white transition-all">
                        Play
                      </button>
                      <audio src={item.track.preview_url}></audio>
                    </div>
                    <Link to={item.track.external_urls.spotify} target="_blank">
                      <RiSpotifyLine className="text-3xl text-green-500" />
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PlaylistInfo;
