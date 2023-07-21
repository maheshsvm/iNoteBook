import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([])
    const [alert, setAlert] = useState(null)

    const showAlert = (message , type) => {
        setAlert({ message ,type });
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
                "auth-token": localStorage.getItem("token")
            }
        });

        const fetchedNotes = await response.json();
        // console.log(fetchedNotes)
        setNotes(fetchedNotes);
    }

    //adding a note
    const addNote = async ({ title, description, tag }) => {
        // console.log("adding a new note......")
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
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify(note)
        });

        await fetchNotes()

        showAlert("Note added succesfully" , "success");
        // setNotes(notes.concat(note))
    }

    // deleting a note
    const deleteNote = async (id) => {
        // console.log("deleting note with id " + id);
        const url = `${host}/api/notes/deletenote/${id}`;
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });

        // const status = await response;
        // console.log(status);
        await fetchNotes();

        showAlert("Note deleted succesfully " , "success")
        // const newNotes = notes.filter((note) =>{return note._id !== id});
        // setNotes(newNotes)
    }

    // edit a note
    const editNote = async (id , note) => {
        const url = `${host}/api/notes/updatenote/${id}`;
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body : JSON.stringify(note)
        });

        // const result = await response.json();
        // console.log(result);
        fetchNotes();
        showAlert("Note Updated succesfully" , "success");
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes, alert , showAlert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState