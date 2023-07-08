import React , {useContext , useEffect}from 'react'
import NoteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(NoteContext)

  useEffect(() => {
    a.fun();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      this is about component
      <p>hey we are creating a movie where actor is {a.state.actor} and actress is {a.state.actress} and director is {a.state.director} </p>
    </div>
  )
}

export default About
