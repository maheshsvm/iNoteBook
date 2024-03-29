import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import NoteItem from '../components/NoteItem'
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, fetchNotes, editNote } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" })
    const [currentNoteId, setCurrentNoteId] = useState(null);
    const navigate = useNavigate();

    const ref = useRef(null)
    const refClose = useRef(null);

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/login')
        else {
            fetchNotes();
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        // console.log("update note called")
        setCurrentNoteId(currentNote._id)
        console.log(currentNoteId)
        ref.current.click();
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        console.log("updating note....")
        e.preventDefault();
        console.log(currentNoteId);
        let noteBody = {
            "title": note.etitle,
            "description": note.edescription,
            "tag": note.etag
        }
        editNote(currentNoteId, noteBody);
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button type="button" style={{ display: 'none' }} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No Notes to display'}
                </div>
                <div className="row">

                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
