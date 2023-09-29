import React, {useEffect, useState}  from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.styles.scss'
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { RootState } from '../../store/store';
import { login } from '../../store/userSlice';
import { setFile, setPreviewUrl } from '../../store/fileSlice';
import useHttpClient from '../../hooks/http-hook';


const RegisterPage: React.FC=()=>{
    // const file= useSelector((state: RootState)=>state.file.file)
    const dispatch= useDispatch()

    const [file, setFile]= useState(null)
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };

    const {isLoading, loadingError,sendRequest}= useHttpClient()

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if(file){
          data.append('image',file)
        }
        try {
          const responseData= await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/users/signup`,"POST",data)
          dispatch(login(responseData))
          
          // After successfully register
          //clear the form
          dispatch(setPreviewUrl(null))
          setFile(null)
          setInputs({
            name: "",
            email: "",
            password: ""
          })
        } catch (err) {
          console.log("wrong")
        }
    };
    return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Eat Food.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <ImageUpload profilePicture={true} file={file} setFile={setFile}/>
            <input
              type="text"
              placeholder="Username"
              name="name"
              onChange={handleChange}
            />
            <input
              type="email"
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
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
    )
}
export default RegisterPage