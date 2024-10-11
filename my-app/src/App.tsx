import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ToggleTheme, ToggleFavorite } from "./hooksExercise";
import { useState, useContext, useEffect } from "react";

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (title: string, isFavorited: boolean) => {
    if (isFavorited) {
      setFavorites((prevFavorites) => [...prevFavorites, title]); // add to list when favorite
    } else {
      setFavorites(
        (prevFavorites) => prevFavorites.filter((favTitle) => favTitle !== title) // remove from list when unfavorited
      );
    }
  };

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // Set theme attribute on body
  }, [theme]);

  return (
    <div className="app-container">
      <form className="note-form">
        <div>
          <input placeholder="Note Title"></input>
        </div>
        <div>
          <textarea placeholder="Note Content"></textarea>
        </div>
        <div>
          <select>
            <option value={Label.other}>Other</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.personal}>Personal</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>
      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <ToggleFavorite title={note.title} onToggleFavorite={toggleFavorite} />
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
      <div className="favorite-notes">
        <h2>List of Favorites:</h2>
        <ul>
          {favorites.map((favoriteTitle, index) => (
            <li key={index}>{favoriteTitle}</li>
          ))}
        </ul>
      </div>
      <div className="theme-button">
        <ToggleTheme toggleTheme={toggleTheme} theme={theme} />
      </div>
    </div>
  );
}

export default App;
