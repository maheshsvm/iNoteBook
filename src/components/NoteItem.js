import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { title, description } = props.note;
    const handleClick = async () => {
        await deleteNote(props.note._id)
    }
    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <i className="fa-solid fa-trash " onClick={handleClick}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={() => props.updateNote(props.note)}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
