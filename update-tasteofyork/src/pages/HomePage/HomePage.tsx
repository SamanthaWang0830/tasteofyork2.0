import React from 'react';
import HomeFlipBox from '../../components/HomeFlipBox/HomeFlipBox';
import { Link } from "react-router-dom";
import './HomePage.styles.scss'

const HomePage: React.FC=()=>{
    return(
        <div className='home-container'>
            <HomeFlipBox    
                beforeFlip="Restaurants inside the campus" 
                afterFlip="Let's explore!"
                route="/findRestaurants"
            />
            <HomeFlipBox    
                beforeFlip="Students-Picked Meals" 
                afterFlip="Let's see!"
                route="/studentsPicks"
            />
            <HomeFlipBox    
                beforeFlip="My Favorite Meals" 
                afterFlip="Let's review!"
                route="/studentsPicks"
            />
            <div>
                <Link to="/login" style={{ textDecoration: "none"}}>
                <p className='underlined-text'>SIGN IN TO HAVE MORE FEATURE</p>
                </Link>
            </div>
        </div>
    )
}
export default HomePage;