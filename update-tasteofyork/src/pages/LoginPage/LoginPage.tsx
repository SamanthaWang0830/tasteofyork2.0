import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.styles.scss'
import useHttpClient from '../../hooks/http-hook'
import { useDispatch } from 'react-redux'
import { login } from '../../store/userSlice'
import { useNavigate } from "react-router-dom"; 
import { validateEmail, validatePassword } from '../validation';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { sendRequest } = useHttpClient()

    const [inputs, setInputs] = useState({
        password: '',
        email: '',
    })
    const [error, setError]=useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(inputs)
    }

    const validateForm=()=>{
        const emailValidateResult = validateEmail(inputs.email)
        const passwordValidateError = validatePassword(inputs.password)
        console.log(emailValidateResult)
        if(inputs.email.length==0 || !emailValidateResult){
            setError("Please enter a valid email")
        }else if(inputs.password.length==0){
            setError("Please enter a password")
        }else if (passwordValidateError){
            setError(passwordValidateError)
        }else{
            return true
        }
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(validateForm()){
            try {
                const responseData = await sendRequest(
                    `${import.meta.env.VITE_BACKEND_URL}/users/login`,
                    'POST',
                    JSON.stringify({
                        email: inputs.email,
                        password: inputs.password,
                    }),
                    { 'Content-Type': 'application/json' }
                )
    
                dispatch(login(responseData))
    
                // After successfully log in
                // jump to home page
                navigate("/");
            } catch (err) {
                setError("Something went wrong, please try again later")
            }
        }
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Libero cum, alias totam numquam ipsa exercitationem
                        dignissimos, error nam, consequatur.
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>

                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                        />
                        <button type="submit">Login</button>
                    </form>
                    <span>{error}</span>
                </div>
            </div>
        </div>
    )
}
export default LoginPage
