import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  AccessToken,
  PlaylistImage,
  PlaylistLink,
  PlaylistName,
} from "../context/Context";

const GeneratePlaylistHome = () => {
  const [resdata, setresdata] = useState(null);
  const [genre, setgenre] = useState("Hindi");
  const playlisturl = useContext(PlaylistLink);
  const accesstoken = useContext(AccessToken);
  const playlistname = useContext(PlaylistName);
  const playlistimage = useContext(PlaylistImage);

  const genres = [
    "Hindi",
    "Kannada",
    "Hollywood",
    "Telugu",
    "Tamil",
    "Punjabi",
    "Malyalam",
  ];

  function handleclick() {
    axios
      .get(
        `https://api.spotify.com/v1/search?q=remaster%2520genre%3A${genre}%2C${""}&type=playlist&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken.accessToken}`,
          },
        }
      )
      .then((response) => {
        setresdata([response.data]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : "Unknown error"
        );
      });
  }

  return (
    <div className="relative w-full h-[90vh] text-white overflow-y-auto">
      <div className="border-2 border-white/5 h-[20vh] m-8 rounded-md flex flex-col filter backdrop-blur-2xl bg-white/5">
        <select
          onChange={(e) => setgenre(e.currentTarget.value)}
          className="bg-transparent m-2 border rounded-md py-2 px-2 font-semibold focus:border-pink-700 transition-all"
          name=""
          id=""
        >
          {genres.map((genre) => {
            return (
              <option className="bg-pink-200 text-pink-700" key={genre} name="" id="">
                {genre}
              </option>
            );
          })}
        </select>
        <br />
        <button
          className="bg-pink-600 hover:bg-pink-500 transition-all mx-2 px-4 py-1 rounded-2xl"
          onClick={handleclick}
        >
          Find
        </button>
      </div>
      {resdata == null ? (
        <></>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {resdata[0].playlists.items.map((item) => {
            return (
              <Link
                key={item.id}
                to={"./playlistinfo"}
                onClick={() => {
                  playlisturl.setplaylistlink(item.tracks.href),
                    playlistname.setplaylistname(item.name),
                    playlistimage.setplaylistimage(item.images[0].url);
                }}
                className="w-40 pb-3 cursor-pointer hover:bg-white/20 transition-all rounded-lg overflow-hidden border-2 border-white/5 bg-white/10 filter backdrop-blur-2xl"
              >
                <img src={item.images[0].url} alt="" />
                <h3 className="font-semibold p-2 mt-2">{item.name}</h3>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GeneratePlaylistHome;
