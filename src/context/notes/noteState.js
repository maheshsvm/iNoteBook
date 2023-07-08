import NoteContext from "./noteContext"
import { useState } from "react"
const NoteState = (props)=>{
    const obj = {
        actor : "varun dhawan",
        actress : "shradha kapoor",
        director : "mahesh sharma ji"
    }
    
    const [state, setState] = useState(obj)
    const fun = ()=>{
        setTimeout(() => {
            setState({
                actor : "mahesh sharma",
                actress : "mahesh sharma",
                director : "mahesh sharma ji"
            })
        }, 2000);
    }
    return (
        <NoteContext.Provider value = {{state , fun}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState