import React from 'react';
import './ResturantCard.styles.scss'
import { Restaurant } from '../../pages/FindRestaurantsPage/FindRestaurantsPage';
import { useSelector, useDispatch } from 'react-redux';
import { openButton} from '../../store/mapButtonSlice';
import { RootState } from '../../store/store'
import Backdrop from '@mui/material/Backdrop';
import Map from '../Map/Map';

interface ResturantCardProps {
    restaurant: Restaurant
}

const ResturantCard: React.FC<ResturantCardProps>=({restaurant})=>{
    const { name, lat, lng, image, address, hours } = restaurant;

    const isOpen = useSelector((state: RootState) => state.mapButton.isOpen);
    const dispatch = useDispatch();
    const handleButtonOpen = () => {
        dispatch(openButton());
    };

    return (
        <div className='restaurant-card'>
            <img src={image} alt={name} />
            <h5>{name}</h5>
            <span>{address}</span>
            <span>Hours of Operation: {hours}</span>
            <button onClick={handleButtonOpen} className='open-map-button'>View On Google Map</button>
            {isOpen && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isOpen}
                >
                 <Map lat={lat} lng={lng}/>
              </Backdrop>
            )}
        </div>
    )
}
export default  ResturantCard