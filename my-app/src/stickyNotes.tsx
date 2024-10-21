import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ToggleTheme, ToggleFavorite } from "./hooksExercise";
import { useState, useContext, useEffect } from "react";

export const StickyNotes = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (title: string, isFavorited: boolean) => {
    if (isFavorited) {
      setFavorites((prevFavorites) => [...prevFavorites, title]); // add title to list of favorites
    } else {
      setFavorites(
        (prevFavorites) => prevFavorites.filter((favTitle) => favTitle !== title) // keep titles not equal to title of unfavorited note
      );
    }
  };

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // if prev theme was light, set to dark; otherwise set to light
  };

  useEffect(() => {
    document.body.setAttribute("curr-theme", theme);
    console.log(`Theme changed to: ${theme}`);
  }, [theme]);

  const [notes, setNotes] = useState(dummyNotesList);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };

  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const deleteNoteHandler = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // keep note ids not equal to id of removed note
  };

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })}
            required
          ></input>
        </div>

        <div>
          <textarea
            placeholder="Note Content"
            onChange={(event) => setCreateNote({ ...createNote, content: event.target.value })}
            required
          ></textarea>
        </div>

        <div>
          <select onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label })} required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <ToggleFavorite title={note.title} onToggleFavorite={toggleFavorite} />
              <button onClick={() => deleteNoteHandler(note.id)}>x</button>
            </div>
            <h2 contentEditable="true"> {note.title} </h2>
            <p contentEditable="true"> {note.content} </p>
            <p contentEditable="true"> {note.label} </p>
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
};
