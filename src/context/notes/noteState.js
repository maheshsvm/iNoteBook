import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([])
    const [alert, setAlert] = useState(null)

    const showAlert = (message)=>{
        setAlert({message});
        setTimeout(() => {
            setAlert(null)
        }, 3000);
    }

    // fetching all notes
    const fetchNotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTk0MWU2MTVhY2VjYmU1YzJkNzZlIn0sImlhdCI6MTY4ODU3NTA3N30.Hx2v8F0WGhkmI_7rSOirxQWq0hmPukg6FGKKcye8x2o"
            }
        });

        const fetchedNotes = await response.json();
        // console.log(fetchedNotes)
        setNotes(fetchedNotes);
    }

    //adding a note
    const addNote = async ({ title, description, tag }) => {
        console.log("adding a new note......")
        let note = {
            "_id": "64a701edd7d9807094091367",
            "user": "64a5941e615acecbe5c2d76e",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-07-06T18:03:25.664Z",
            "__v": 0
        }

        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTk0MWU2MTVhY2VjYmU1YzJkNzZlIn0sImlhdCI6MTY4ODU3NTA3N30.Hx2v8F0WGhkmI_7rSOirxQWq0hmPukg6FGKKcye8x2o"
            },
            body: JSON.stringify(note)
        });

        await fetchNotes()

        showAlert("Note added succesfully");
        // setNotes(notes.concat(note))
    }

    // deleting a note
    const deleteNote = async (id) => {
        console.log("deleting note with id " + id);
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTk0MWU2MTVhY2VjYmU1YzJkNzZlIn0sImlhdCI6MTY4ODU3NTA3N30.Hx2v8F0WGhkmI_7rSOirxQWq0hmPukg6FGKKcye8x2o"
            }
        });

        const status = await response;
        console.log(status);
        await fetchNotes();

        showAlert("Note deleted succesfully bro")
        // const newNotes = notes.filter((note) =>{return note._id !== id});
        // setNotes(newNotes)
    }

    // update a note
    const updateNote = (id) => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, fetchNotes , alert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState