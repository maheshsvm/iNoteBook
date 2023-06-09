import React , {useState , useContext}from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(NoteContext)
    const {addNote} = context;
    const [note, setNote] = useState({title : "" , description : "" , tag : "default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note);
    }

    const onChange = (e)=>{
        setNote({...note , [e.target.name] : e.target.value})
    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlfor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title"  name = "title" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlfor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlfor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
