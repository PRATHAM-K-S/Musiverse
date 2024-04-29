import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import GeneratePlaylist from "./pages/GeneratePlaylist.jsx";
import GeneratePlaylistHome from "./pages/GeneratePlaylistHome.jsx";
import PlaylistInfo from "./pages/PlaylistInfo.jsx";
import Tools from "./pages/Tools.jsx";
import Profile from "./pages/Profile.jsx";
import TopTracks from "./pages/TopTracks.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-cc4qwe7vujvjk8qw.us.auth0.com"
      clientId="zyZRhfALT5d8sXCFm0APzKN41eIKW3bn"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/tools" element={<App />}>
            <Route index element={<Tools />} />
            <Route path="generate_playlist" element={<GeneratePlaylist />}>
              <Route index element={<GeneratePlaylistHome />} />
              <Route path="playlistinfo" element={<PlaylistInfo />} />
            </Route>
            <Route path="artist_top_tracks" element={<TopTracks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
