import React, {useEffect, useState}  from 'react';
import { Link } from 'react-router-dom';
import './Login.styles.scss'
import jwt_decode from 'jwt-decode'
import useHttpClient from '../../hooks/http-hook';
import { useDispatch } from 'react-redux';
import { login } from '../../store/userSlice';
import {useNavigate} from "react-router-dom";
declare const google: any


const LoginPage: React.FC=()=>{
    //之后用redux toolkit来处理这个user， 而不用useState
    const [user,setUser]= useState<any>({})

    const handleCallbackResponse=(response:any)=>{
        console.log("Encoded JWT ID token:"+ response.credential)
        const userObject=jwt_decode(response.credential)
        console.log(userObject)
        setUser(userObject)
        // if we already has a user, hide the google sign in button
        document.getElementById("signInDiv")!.hidden= true
    }

    const handleSignOut=()=>{
        setUser({})
        document.getElementById("signInDiv")!.hidden= false
    }

    // run once
    useEffect(()=>{
        // global google
        google.accounts.id.initialize({
        client_id: "604459431179-7t4ijral4j35fret2rugvs5220rnsqp6.apps.googleusercontent.com",
        callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme:"outline", size:'large'}
        )
    },[])


    //
    const dispatch = useDispatch();
    const {sendRequest}= useHttpClient()

    const [inputs, setInputs] = useState({
      password: "",
      email:"",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
      console.log(inputs)
    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
      try {
        const responseData= await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/users/login`,"POST",JSON.stringify({email:inputs.email,password:inputs.password}), {"Content-Type":"application/json"})

        dispatch(login(responseData))

        // After successfully log in 
        // clear the form
        setInputs({
          password: "",
          email:"",
        })
        // jump to home page
        const navigate= useNavigate()
        navigate('/')
        
      } catch (err) {

      }
    };

    return(
      <div className='login'>
        <div className="card">
          <div className="left">
            <h1>Hello World.</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
              alias totam numquam ipsa exercitationem dignissimos, error nam,
              consequatur.
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
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <button type="submit">Login</button>
            </form>
            <div id='signInDiv'></div>
              {
                Object.keys(user).length!=0 &&
                <button onClick={handleSignOut}></button>
              }
          </div>
          
        </div>
      </div>
      
    )
}
export default LoginPage;