import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const Alert = () => {
    const context = useContext(NoteContext);
    const {alert}  = context
    return (
        <div style={{height : "40px"}}>
            {alert && (<div className="alert alert-primary" role="alert">
                {alert.message}
            </div>)}
        </div>
    )
}

export default Alert
