import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { BiBrightness } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import axios from "axios";

const App = () => {
  
  const CLIENT_ID = "";
  const REDIRECT_URI = "http://addi-G998.github.io/spotify-react";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [index, setindex] = useState(0);
  const [darkMode, setDarkmode] = useState(false);
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([[]]);
  const [song, setSong] = useState("");
  const [trackImage, setTrackImage] = useState([]);
  const brightness = darkMode ? "bg-black/90" : "bg-white";
  const textBrightness = darkMode ? "text-white" : "text-black";

  const toggleDarkMode = () => {
    setDarkmode(true);
  };
  const toggleBrightMode = () => {
    setDarkmode(false);
  };
  const nextImg = () => {
    setindex(index < trackImage.length - 1 ? index + 1 : 0);
  };
  const prevImg = () => {
    setindex(index > 0 ? index - 1 : trackImage.length - 1);
  };
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  const searchArtist = async (e) => {
    e.preventDefault();
    if (!searchKey) {
      console.log("No search key provided");
      return;
    }
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });
    setTracks(data.tracks.items);
    console.log(data);
  };

  const songResults = () => {
    return tracks.map((track) => (
      <div
        className={`${textBrightness} cursor-pointer border-2 border-white`}
        onClick={() => {
          setSong(track.id);
          setTrackImage(track.album.images);
          console.log(track.name);
        }}
        key={track.id}
      >
        {track.name ? track.name + "/  " : "Such nach einem Song "}
        {track.artists &&
        track.artists.length > 0 &&
        track.artists[0].hasOwnProperty("name")
          ? track.artists.map((artist) => artist.name).join(", ")
          : "Kein Künstlername verfügbar"}
      </div>
    ));
  };
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <React.Fragment>
      <div className={`min-h-screen ${brightness}`}>
        <div className="absolute left-0 top-0 h-16 w-full">
          <h1 className={`${textBrightness} m-2 font-serif text-4xl`}>
            .shard
          </h1>
          <div className="absolute right-5 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white">
            <BiBrightness onClick={toggleBrightMode} />
          </div>
          <div className="absolute right-5 top-[119%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white">
            <FaMoon onClick={toggleDarkMode} />
          </div>
        </div>
        <div className="flex">
          <div className="mt-15 relative w-full max-w-[600px] px-4 py-16">
            <div className="w-full max-w-full overflow-hidden rounded-xl">
              <img
                src={trackImage && trackImage[index] ? trackImage[index].url : ''} //carousel[index].url
                alt="carousel"
                className="h-auto w-full object-cover duration-500"
                style={{ aspectRatio: "16/9" }} // Optional: Set a fixed aspect ratio for images
              />
            </div>
            <div className="absolute left-5 top-[40%] -translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white">
              <BsChevronCompactLeft onClick={prevImg} size={30} />
            </div>
            <div className="absolute right-5 top-[40%] -translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white">
              <BsChevronCompactRight onClick={nextImg} size={30} />
            </div>
          </div>
          <div className={`${textBrightness} mt-10 `}>
            {!token ? (
              <a
                className="relative left-[75%] text-2xl text-blue-500 "
                href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              >
                Login to Spotify
              </a>
            ) : (
              <button
                onClick={logout}
                className="text-red relative left-[75%] text-2xl"
              >
                Logout
              </button>
            )}

            {token ? (
              <form onSubmit={searchArtist}>
                <input
                  className="relative left-[69%] mt-4 border-black text-2xl text-black"
                  type="text"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
                <button
                  className="text-red relative left-[70%] text-2xl"
                  type={"submit"}
                >
                  Search
                </button>
              </form>
            ) : (
              <h2 className="text-red relative left-[75%] text-2xl">
                Please Login
              </h2>
            )}
          </div>
          <div className="mt-60 max-h-[200px] w-[600px] overflow-y-auto ">
            {songResults()}
          </div>
        </div>
        <div className="w-full max-w-[600px] px-4 py-16">
          <iframe
            className="h-[352px] w-[100%] rounded-lg"
            src={`https://open.spotify.com/embed/track/${song}?utm_source=generator`}
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
