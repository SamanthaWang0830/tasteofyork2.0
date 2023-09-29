import React from 'react';
import './Map.styles.scss'
import { GoogleMap, useLoadScript,MarkerF} from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { closeButton } from '../../store/mapButtonSlice';

interface MapProps{
    lat:number;
    lng:number;
}

const Map: React.FC<MapProps> = ({lat, lng}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAULYT530LbeVT3vC4yynoj67VmkuPhfh0",
  });
  const center ={lat, lng}

  const dispatch = useDispatch();
  const handleButtonClose=()=>{
    dispatch(closeButton());
  }

  return (
    <div className='map-container'>
        <button className='close-map-button' onClick={handleButtonClose}>CLOSE</button>
        {
            !isLoaded ? (<div>Loading...</div>):(
                <GoogleMap zoom={17} center={center} mapContainerClassName="actual-map">
                    <MarkerF position={center} />
                </GoogleMap>
            )
        }
    </div>
  )
};


export default Map;