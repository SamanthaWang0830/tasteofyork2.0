import React from 'react';
import './FindRestaurantsPage.styles.scss'
import ResturantCard from '../../components/ResturantCard/ResturantCard';

export interface Restaurant {
    id: string;
    image: string;
    name: string;
    address: string;
    hours: string;
    lat: number;
    lng: number;
}

const DUMMY_RESTAURANTS: Restaurant[] =[
    {
        id:'r1',
        image:"https://lh5.googleusercontent.com/p/AF1QipOYz7v5IXjOQ0KjI2oPqLOt2M211HKCjnC_LG6V=w408-h271-k-no",
        name:"Z-teca Mexican Eatery ",
        address:"80 York Blvd, York Lanes Mall",
        hours:"12 - 7 p.m.",
        lat:43.779258683189084 -79.50172662688334,
        lng:-79.50172662688334,
    },
    {
        id:'r2',
        image:"https://lh5.googleusercontent.com/p/AF1QipNP4RbkFHqN8amfeuqbCZznSzW7UXa10nuUN04T=w427-h240-k-no",
        name:"Wendy's",
        address:"4700 Keele St, North York",
        hours:"7:30 a.m. - 11:30 p.m.",
        lat:43.7753239925882,
        lng:-79.50275346833938,
    },
    {
        id:'r3',
        image:"https://lh5.googleusercontent.com/p/AF1QipPkBTrypJ761O4UoCoAY9vctwkg2QdAuC60FDUd=w408-h306-k-no",
        name:"Booster Juice",
        address:"4700 Keele St, North York",
        hours:"8:30 a.m. - 9 p.m.",
        lat:43.774041787972244,
        lng:-79.50544766656968,
    },
    {
        id:'r4',
        image:"https://lh5.googleusercontent.com/p/AF1QipNFPcZDUdAdxR1oay2Zg8wQCgFC6aMCWnx3USUf=w408-h306-k-no",
        name:"Pagoda Tree",
        address:"4700 Keele St, North York",
        hours:"11 a.m. - 8 p.m.",
        lat:43.77427229880191,
        lng:-79.5026459744934,
    },
]



const FindRestaurantsPage: React.FC=()=>{
    
    return(
        <div className='restaurant'>
            <h2>Restaurants inside the campus</h2>
            <div className='restaurant-container'>
                {
                    DUMMY_RESTAURANTS.map((restaurant)=>(
                        <ResturantCard key={restaurant.id} restaurant={restaurant}/>
                    ))
                }
            </div>
        </div>
    )
}
export default FindRestaurantsPage;