import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  // Different Player states
  const [timeInfo, setTimeInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // Use ref to access audio tag from Player Component
  const audioRef = useRef(null);

  // Event handlers and hepler functions
  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
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

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(timeInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min="0"
          max={timeInfo.duration}
          value={timeInfo.currentTime}
          type="range"
        />
        <p>{formatTime(timeInfo.duration)}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
