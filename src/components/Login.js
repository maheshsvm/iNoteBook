import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    let context = useContext(NoteContext);
    let { showAlert } = context;
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authToken)
            navigate('/')
            showAlert("Loged In successfully!!" , "success")
        }
        else showAlert("login with correct credentials" , "warning");
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container mt-3" onSubmit={onSubmit}>
            <h2 >Please Login to use iNoteBook</h2>
            <form>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name='email' id="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
