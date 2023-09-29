import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './Header.styles.scss'
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Header: React.FC=()=>{
    const token= useSelector((state:RootState)=>state.user.token)
    const avatar= useSelector((state:RootState)=>state.user.avatar)
    const userId= useSelector((state:RootState)=>state.user.userId)
    const navigate= useNavigate()
    
    const dispatch= useDispatch()
    const handleSignOut=()=>{
        dispatch(logout())
        // jump to home page
        
        navigate('/')
    }

    return(
        <div className='box'>
            <div className='left'>
                <Link style={{ textDecoration: "none" }} to="/">
                    <span>Taste of York</span>
                </Link>
            </div>
            
            <div className='right'>
                <Link
                    style={{ textDecoration: "none", color:'gray'}}
                    to="/findRestaurants"
                >
                    <span>Restaurants</span>
                </Link>
                <Link
                    style={{ textDecoration: "none",color:'gray'}}
                    to="/studentsPicks"
                >
                    <span>StudentsPicks</span>
                </Link>

                {
                    token? (
                        <>
                            <Link
                                style={{ textDecoration: "none",color:'gray'}}
                                to={`/${userId}/meals`}
                            >
                                <span>MyMeals</span>
                            </Link>
                            <div>
                                <button onClick={handleSignOut}>Sign Out</button>
                            </div>
                            
                            
                        </>
                    ):(
                        <Link
                            style={{ textDecoration: "none",color:'gray'}}
                            to="/login"
                        >
                            <button>Sign In</button>
                        </Link>
                    )
                }
                
            </div>
            <Outlet/>
        </div>
    )
}
export default Header;