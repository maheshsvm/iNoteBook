import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
