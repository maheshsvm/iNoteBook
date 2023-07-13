import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import NavBar from './components/NavBar';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          {/* <Alert message="hey this is a cool website"/> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
