import LibrarySong from "./LibrarySong";

const Library = ({ songs, currentSong, setCurrentSong, isToggled }) => {
  return (
    <div className={`library ${!isToggled ? "toggled" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs"></div>
      {songs.map((song) => (
        <LibrarySong
          song={song}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          key={song.id}
        />
      ))}
    </div>
  );
};

export default Library;
