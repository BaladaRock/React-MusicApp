const LibrarySong = ({ song, currentSong, setCurrentSong }) => {
  const selectSongHandler = () => {
    song.active = true;
    currentSong.active = false;
    setCurrentSong(song);
  };

  return (
    <div
      onClick={selectSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
