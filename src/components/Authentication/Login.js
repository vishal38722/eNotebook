import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import { loginRoute } from "../../utils/APIRoutes";
import axios from 'axios';

function Login() {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({email:"", password:""});
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    
    const handleChange = (e) => {
        // ...credentials --> spread operator
        setCredentials({...credentials, [e.target.name]: e.target.value});
        // setEmail(...email, [e.target.name], e.target.value);
        // setPassword(...password, [e.target.name], e.target.value);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        const { data } = await axios.post(loginRoute, {
            email,
            password,
          });
          console.log(data)
          if (data.status === true) {
            localStorage.setItem('token', data.authToken)
            navigate("/")  
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
