import React from "react";
import { Link } from "react-router-dom";
import { TbPlaylist } from "react-icons/tb";
import { RiToolsFill } from "react-icons/ri";

const Tools = () => {
  return (
    <div className="relative m-4 items-center flex flex-col gap-4">
      <Link to={"/tools/generate_playlist"}>
        <div className="w-[95vw] relative hover:contrast-125 transition-all h-40 rounded-md bg-[url('/src/assets/generateplaylist.jpg')] bg-cover border-2 border-white/50 flex justify-center items-center">
          <h3 className="text-3xl font-bold text-white flex items-center"><TbPlaylist className="mt-2"/>Generate Playlists</h3>
        </div>
      </Link>
      <Link to={"/tools/artist_top_tracks"}>
        <div className="w-[95vw] relative hover:contrast-125 transition-all h-40 rounded-md bg-[url('/src/assets/generateplaylist.jpg')] bg-cover border-2 border-white/50 flex justify-center items-center">
          <h3 className="text-3xl font-bold text-white flex items-center"><TbPlaylist className="mt-2"/>Top Tracks</h3>
        </div>
      </Link>
      <p className="text-gray-400  font-semibold flex items-center gap-1"><RiToolsFill/>More Tools Coming Soon....</p>
    </div>
  );
};

export default Tools;
