import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props) => {
  const initialNotes = [
    {
      "_id": "64a701c7d7d980709409135d",
      "user": "64a5941e615acecbe5c2d76e",
      "title": "note 1",
      "description": "note 1 is a good note",
      "tag": "funny",
      "date": "2023-07-06T18:02:47.556Z",
      "__v": 0
    },
    {
      "_id": "64a701c9d7d980709409135f",
      "user": "64a5941e615acecbe5c2d76e",
      "title": "note 1",
      "description": "note 1 is a good note",
      "tag": "funny",
      "date": "2023-07-06T18:02:49.130Z",
      "__v": 0
    },
    {
      "_id": "64a701c9d7d9807094091361",
      "user": "64a5941e615acecbe5c2d76e",
      "title": "note 1",
      "description": "note 1 is a good note",
      "tag": "funny",
      "date": "2023-07-06T18:02:49.991Z",
      "__v": 0
    },
    {
      "_id": "64a701edd7d9807094091367",
      "user": "64a5941e615acecbe5c2d76e",
      "title": "news is funny",
      "description": "today a mokey caught a dog by his teeth",
      "tag": "funny",
      "date": "2023-07-06T18:03:25.664Z",
      "__v": 0
    },
    {
      "_id": "64a701edd7d9807094091367",
      "user": "64a5941e615acecbe5c2d76e",
      "title": "news is funny",
      "description": "today a mokey caught a dog by his teeth",
      "tag": "funny",
      "date": "2023-07-06T18:03:25.664Z",
      "__v": 0
    },
    {
      "_id": "64a701edd7d9807094091367",
      "user": "64a5941e615acecbe5c2d76e",
      "title": "news is funny",
      "description": "today a mokey caught a dog by his teeth",
      "tag": "funny",
      "date": "2023-07-06T18:03:25.664Z",
      "__v": 0
    },
    {
      "_id": "64a701edd7d9807094091367",
      "user": "64a5941e615acecbe5c2d76e",
      "title": "news is funny",
      "description": "today a mokey caught a dog by his teeth",
      "tag": "funny",
      "date": "2023-07-06T18:03:25.664Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(initialNotes)

  //adding a note
  const addNote = ({title , description , tag})=>{
    console.log("adding a new note")
    let note = {
      "_id": "64a701edd7d9807094091367",
      "user": "64a5941e615acecbe5c2d76e",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-07-06T18:03:25.664Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  // deleting a note
  const deleteNote = (id)=>{
    console.log("deleting note with id " + id)
    const newNotes = notes.filter((note) =>{return note._id != id});
    setNotes(newNotes)
  }

  // update a note
  const updateNote = (id)=>{

  }

  return (
    <NoteContext.Provider value={{ notes, addNote , deleteNote , updateNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState