import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './HomeFlipBox.styles.scss'

interface HomeFlipBoxProps {
    beforeFlip: string;
    afterFlip: string;
    route: string;
}

const HomeFlipBox: React.FC<HomeFlipBoxProps>=({beforeFlip, afterFlip, route})=>{
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsFlipped(true);
    };
    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    return (
        <div
            className={`flip-box ${isFlipped ? 'flipped' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                    
            <div className="flip-box-inner">
           
                <div className="flip-box-front">
                    <p>{beforeFlip}</p>
                </div>
                
                <div className="flip-box-back">
                    <Link to={route} style={{ textDecoration: "none"}}>
                        <p>{afterFlip}</p>
                    </Link>
                </div>
            </div>
                
        </div>
    )
}

export default HomeFlipBox