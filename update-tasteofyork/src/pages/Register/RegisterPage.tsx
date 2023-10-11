import React, {useState}  from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.styles.scss'
import { useDispatch} from 'react-redux';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { login } from '../../store/userSlice';
import { setPreviewUrl } from '../../store/fileSlice';
import useHttpClient from '../../hooks/http-hook';
import { validateEmail, validatePassword } from '../validation';
import { useNavigate } from "react-router-dom"; 



const RegisterPage: React.FC=()=>{
    // const file= useSelector((state: RootState)=>state.file.file)
    const dispatch= useDispatch()
    const navigate = useNavigate();
    const [error, setError]=useState("")
    const [file, setFile]= useState(null)
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };

    console.log(inputs)


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
      }else if(!file){
          setError("Please select an image as the avatar")
      }else{
        return true
      }
  }

    const {sendRequest}= useHttpClient()

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if(file){
          data.append('image',file)
        }
        if(validateForm()){
          try {
            const responseData= await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/users/signup`,"POST",data)
            dispatch(login(responseData))
            
            // After successfully register
            //clear the form
            dispatch(setPreviewUrl(null))
            setFile(null)
            
            navigate("/");
          } catch (err) {
            setError("Something went wrong, please try again later")
          }
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
          <span>{error}</span>
        </div>
      </div>
    </div>
    )
}
export default RegisterPage