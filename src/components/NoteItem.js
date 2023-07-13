import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;

    const { title, description } = props.note;
    const handleClick = ()=>{
        deleteNote(props.note._id)

    }
    return (
        <div className='col-md-3 my-3'>
            <div class="card" >
                    <div class="card-body">
                        <h5 class="card-title">{title}</h5>
                        <p class="card-text">{description}</p>
                        <i class="fa-solid fa-trash " onClick={handleClick}></i>
                        <i class="fa-solid fa-pen-to-square mx-3"></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
