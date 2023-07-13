import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';
import NoteItem from '../components/NoteItem'
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    return (
        <>
            <AddNote />
            <div className="container my-3">
                <h2>Your Notes</h2>
                <div className="row">

                    {notes.map((note) => {
                        return <NoteItem note={note} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
