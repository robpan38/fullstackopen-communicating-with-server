import "./App.css";
import Note from "./components/Note";

function App({ notes }) {
  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note}></Note>
        ))}
      </ul>
    </div>
  );
}

export default App;
