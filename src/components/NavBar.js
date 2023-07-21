import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';

const NavBar = () => {
    const location = useLocation();
    const context = useContext(NoteContext);
    const {showAlert} = context;
    const navigate = useNavigate();
    // useEffect(() => {
    //   console.log(location.pathname)
    // }, [location])

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        showAlert("Loged Out successfully" , "success");
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>


                    </ul>
                    <div>
                        {!localStorage.getItem('token') ? 
                            <div>
                                <Link className="btn btn-primary mx-2" to="/login" role="button">LogIn</Link>
                                <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
                            </div>: 
                            <Link className="btn btn-primary mx-2" to="/login" onClick={handleLogout} role="button">LogOut</Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
