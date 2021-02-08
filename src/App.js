import React, { useState } from "react";
// Scss file for styling
import "./styles/App.scss";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Util data file
import data from "./util";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isToggled, setIsToggled] = useState(true);

  return (
    <div className="App">
      <Nav isToggled={isToggled} setIsToggled={setIsToggled} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isToggled={isToggled}
        setIsToggled={setIsToggled}
      />
    </div>
  );
}

export default App;
