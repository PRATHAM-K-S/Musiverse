import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AccessToken } from "../context/Context";
import { useState } from "react";
import { RiSpotifyLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const TopTracks = () => {
  const accesstoken = useContext(AccessToken);
  const [artistname, setartistname] = useState("");
  const [artistid, setartistid] = useState("");
  const [toptracks, settoptracks] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.spotify.com/v1/search?q=remaster%2520artist%3A${artistname}&type=artist&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setartistid(response.data.artists.items[0].id);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : "Unknown error"
        );
      });
  }, [artistname]);

  function gettoptracks() {
    axios
      .get(`https://api.spotify.com/v1/artists/${artistid}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${accesstoken.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        settoptracks(response.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : "Unknown error"
        );
      });
  }

  return (
    <div className="relative w-full h-screen overflow-y-auto flex flex-col items-center text-white">
      <div className="my-4 border w-[90vw] flex justify-center items-center h-24 rounded-md bg-white/5 filter backdrop-blur-3xl">
        <input
          className="py-2 px-4  focus:border focus:border-pink-500 outline-none rounded-l-2xl text-pink-600"
          value={artistname}
          placeholder="Artist Name"
          onChange={(e) => setartistname(e.currentTarget.value)}
          type="text"
        />
        <button
          className="bg-pink-600 px-4 py-2 rounded-r-2xl"
          onClick={gettoptracks}
        >
          Get Tracks
        </button>
      </div>
      <div className="w-full ml-[10vw] h-[80vh] overflow-y-scroll mb-24">
        <h3 className="font-semibold text-2xl">
          Top 10 tracks of <span className="text-pink-500">{artistname}</span>
        </h3>
        <br />
        <div className="w-[90vw] flex flex-col gap-2 items-center">
          {toptracks == null
            ? console.log(null)
            : toptracks.tracks.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-[90vw] border p-1 rounded-md flex items-center"
                  >
                    <img
                      className="w-14 rounded-md"
                      src={item.album.images[0].url}
                      alt=""
                    />
                    <div className="ml-2 flex flex-col w-full gap-1">
                      <h3 className="font-semibold text-xs">{item.name}</h3>
                      <div>
                        {item.artists.map((item) => {
                          return (
                            <span key={item.id} className="text-xs">
                              {item.name},
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-end w-full">
                      <div
                        onClick={(e) => {
                          e.currentTarget.children[1].paused
                            ? (e.currentTarget.children[1].play(),
                              (e.currentTarget.children[0].innerHTML = "Pause"))
                            : (e.currentTarget.children[1].pause(),
                              (e.currentTarget.children[0].innerHTML = "Play"),
                              (e.currentTarget.children[1].currentTime = 0));
                        }}
                      >
                        <button className="bg-pink-600 px-3 rounded-2xl text-xs py-1 mx-1">
                          Play
                        </button>
                        <audio src={item.preview_url}></audio>
                      </div>
                      <Link to={item.external_urls.spotify} target="_blank">
                        <RiSpotifyLine className="text-2xl mx-1 text-green-500" />
                      </Link>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default TopTracks;
