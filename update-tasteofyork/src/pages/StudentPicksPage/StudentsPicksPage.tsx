import React, {useEffect, useState} from 'react';
import './StudentPicksPage.styles.scss'
import MealCard from '../../components/MealCard/MealCard';
import CreateMealOrUpdateCard from '../../components/CreateOrUpdateMealCard/CreateOrUpdateMealCard';
import useHttpClient from '../../hooks/http-hook';
import Backdrop from '@mui/material/Backdrop';
import { useSelector} from 'react-redux';
import { RootState } from '../../store/store';

const StudentsPicksPage: React.FC=()=>{
    // create a new Meal
    const [file,setFile]=useState()
    const isOpen = useSelector((state: RootState) => state.meal.isOpen);
    const token= useSelector((state: RootState)=>state.user.token)
    const forceRender = useSelector((state: RootState) => state.meal.forceRender);
    //fetch all the meals from mongoDB
    const {sendRequest}= useHttpClient()
    const [force,setForce]=useState(0)
    const [loadedPicks, setLoadedPicks]=useState([])

    useEffect(() => {
        const fetchPicks= async () => {
            try {
                const responseData = await sendRequest(
                `${import.meta.env.VITE_BACKEND_URL}/meals`
                );
                setLoadedPicks(responseData.meals);
            } catch (err) {
                console.log("something went wrong can not fetch the meals")
            }
        };
        fetchPicks();
    }, [sendRequest,force, forceRender]);

    //like and dislike function
    const likeHandler =async (id: string) => {
        try {
            await sendRequest(import.meta.env.VITE_BACKEND_URL+`/meals/${id}/likePost`,"PATCH")
            setForce(pre=>pre+1)
        } catch (err) {

        }
    }
    const dislikeHandler =async (id: string) => {
        try {
            await sendRequest(import.meta.env.VITE_BACKEND_URL+`/meals/${id}/dislikePost`,"PATCH")
            setForce(pre=>pre+1)
        } catch (err) {

        }
    }

    const deleteHandler=async(id: string)=>{
        console.log(id)
        console.log(token)
        try {
            await sendRequest(
                `${import.meta.env.VITE_BACKEND_URL}/meals/${id}`,
                'DELETE',
                null,
                {Authorization:"Bearer "+token}
            )
            console.log(1)
        } catch (err) {
            console.error('Error deleting meal:', err);
        }
    }

    return(
    <>
        <div className='student-pick'>
            <h2>Student-Picks Meal</h2>
            <div className='meal-container'>
                
                {
                    loadedPicks && loadedPicks.map((pick)=>(
                        <MealCard pick={pick} likeHandler={likeHandler} dislikeHandler={dislikeHandler} deleteHandler={deleteHandler} />
                    ))
                }

                <CreateMealOrUpdateCard isUpdate={false} file={file} setFile={setFile}/>
            </div>
        </div>
        {
            isOpen && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isOpen}
                >
                    <CreateMealOrUpdateCard isUpdate={true} file={file} setFile={setFile}/>
                </Backdrop>
            )
        }
    </>
    )
}
export default StudentsPicksPage;