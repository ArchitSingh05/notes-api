import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch('http://localhost:8080/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  };

  const createNote = () => {
    fetch('http://localhost:8080/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    }).then(() => {
      setTitle('');
      setContent('');
      fetchNotes();
    });
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:8080/api/notes/${id}`, {
      method: 'DELETE'
    }).then(() => fetchNotes());
  };

  return (
    <div className="App">
      <h1>My Notes</h1>

      <div className="form-card">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button onClick={createNote}>Add note</button>
      </div>

      <p className="notes-count">{notes.length} notes</p>

      {notes.map(note => (
        <div className="note-card" key={note.id}>
          <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <button className="delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;