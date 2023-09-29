import React, {useState, useEffect} from 'react';
import './MyMealsPage.styles.scss'
import { useParams } from "react-router-dom"
import useHttpClient from '../../hooks/http-hook';
import MealCard from '../../components/MealCard/MealCard';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/store';
import { openButton, setUpdatedMealId, setForceRender} from '../../store/mealSlice';
import CreateMealOrUpdateCard from '../../components/CreateOrUpdateMealCard/CreateOrUpdateMealCard'
import Backdrop from '@mui/material/Backdrop';


const MyMealsPage: React.FC=()=>{

    // const token= useSelector((state: RootState)=>state.user.token)
    const isOpen = useSelector((state: RootState) => state.meal.isOpen);
    const forceRender = useSelector((state: RootState) => state.meal.forceRender);
    const token= useSelector((state: RootState)=>state.user.token)
    const {userId}= useParams<{ userId: string }>()

    const [loadedMeal, setLoadedMeal]=useState([])
    const {isLoading, loadingError,sendRequest}= useHttpClient()

    useEffect(()=>{
        const fetchMeals=async()=>{
            try {
                const responseData=await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/meals/user/${userId}`)
                setLoadedMeal(responseData.meals)
            } catch (err) {
                console.log("there are some error when fetch the myMeals")
            }
        }
        fetchMeals()
    },[sendRequest,userId, forceRender])

    const dispatch=useDispatch()
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
            dispatch(setForceRender())
        } catch (err) {
            console.error('Error deleting meal:', err);
        }
    }
   
    return(
        <div className='my-meals'>
            <h2>My favorite Meals</h2>
            <div className='meal-container'>
                {
                    loadedMeal && loadedMeal.map((pick)=>(
                        <MealCard pick={pick} deleteHandler={deleteHandler} />
                    ))
                }
                {
                    isOpen && (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={isOpen}
                        >
                            <CreateMealOrUpdateCard isUpdate={true}/>
                        </Backdrop>
                    )
                }
            </div>
        </div>
    )
}
export default MyMealsPage;