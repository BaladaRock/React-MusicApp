import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
}) => {
  // Different Player states
  const [timeInfo, setTimeInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // Store current animation transition position and color gradients
  const firstGradient = currentSong.color[0];
  const secondGradient = currentSong.color[1];
  const animationPercentage = Math.round(
    (timeInfo.currentTime / timeInfo.duration) * 100
  );

  // Use ref to access audio tag from Player Component
  const audioRef = useRef(null);

  // Event handlers and hepler functions
  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const switchSongHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setTimeInfo({ ...timeInfo, currentTime: e.target.value });
  };
  const playSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  const updateTimeHandler = (e) => {
    setTimeInfo({
      ...timeInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };
  const playNextSongHandler = () => {
    const currentIndex = songs.indexOf(currentSong) + 1;
    setCurrentSong(songs[currentIndex % songs.length]);
  };

  const changeSongHandler = (toChange) => {
    const currentIndex = songs.indexOf(currentSong);
    const nextIndex = currentIndex + toChange;
    const songsLength = songs.length;

    setCurrentSong(
      currentIndex === 0
        ? songs[nextIndex] || songs[songsLength - 1]
        : songs[nextIndex % songsLength]
    );
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(timeInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${firstGradient},${secondGradient})`,
          }}
          className="track"
        >
          <input
            onChange={dragHandler}
            min="0"
            max={timeInfo.duration || 0}
            value={timeInfo.currentTime}
            type="range"
          />
          <div
            style={{
              transform: `translateX(${animationPercentage}%)`,
            }}
            className="animate-track"
          ></div>
        </div>
        <p>{formatTime(timeInfo.duration || 0)}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon
          onClick={() => changeSongHandler(-1)}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => changeSongHandler(1)}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onLoadedData={switchSongHandler}
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={playNextSongHandler}
      ></audio>
    </div>
  );
};

export default Player;
