import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';

const Signup = () => {
  const [details, setDetails] = useState({ name: "", email: "", password: ""  , cpassword:""});
  let navigate = useNavigate();
  const context = useContext(NoteContext)
  const {showAlert} = context; 



  const onSubmit = async (e) => {
    e.preventDefault();
    if(details.cpassword !== details.password){
      setDetails({name: "", email: "", password: ""  , cpassword:""});
      showAlert("Passwords does not match");
      return;
    }
    let response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    });

    const json = await response.json();
    // console.log(json)
    if(json.success){
      localStorage.setItem("token" , json.authToken);
      showAlert("Signed Up successfully" , "success");
      navigate('/');
    }
    else{
      showAlert(json.error , "warning")
    }
  }

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  return (
    <div className='container mt-3'>
      <h2>Please SignUp to use iNoteBook</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name='name' value={details.name} className="form-control" id="name" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value={details.email} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name='password' value={details.password} className="form-control" id="exampleInputPassword1" onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputcPassword1" className="form-label">Confirm Password</label>
          <input type="password" name='cpassword' value={details.cpassword} className="form-control" id="exampleInputcPassword1" onChange={onChange} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
