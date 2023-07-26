import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import { loginRoute } from "../utils/APIRoutes";

function Login() {
    let navigate = useNavigate ();

    const [credentials, setCredentials] = useState({email:"", password:""});
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
        // setEmail(...email, [e.target.name], e.target.value);
        // setPassword(...password, [e.target.name], e.target.value);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call
        const response = await fetch(`${loginRoute}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
        });
        const json = await response.json();
        // console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate("/")   
        }
        else {
            alert("Invalid Credentials");
        }
    }


    return (
        <div>
            <div className='container my-4'>
                <h3>Login to your account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" placeholder='Enter your email' className="form-control" value={credentials.email} id="email" name='email' required aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" placeholder='Enter your password' className="form-control" value={credentials.password} id="password" name='password' required onChange={handleChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
