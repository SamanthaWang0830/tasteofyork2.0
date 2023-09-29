import React from 'react';
import './CreateOrUpdateMealCard.styles.scss'
import ImageUpload from '../ImageUpload/ImageUpload';
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../store/store';
import useHttpClient from '../../hooks/http-hook';
import { setForceRender,setDescription,setName ,closeButton} from '../../store/mealSlice';
import { setPreviewUrl } from '../../store/fileSlice';

interface CreateMealOrUpdateCardProps{
    isUpdate:boolean;
    file?: any;
    setFile?: any;
}

const CreateMealOrUpdateCard: React.FC<CreateMealOrUpdateCardProps>=({isUpdate, setFile, file})=>{
    // const [file, setFile]= useState(null)
    const dispatch = useDispatch();
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const name= e.target.value
        dispatch(setName(name))
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const description= e.target.value
        dispatch(setDescription(description))
    }
    
    const token= useSelector((state: RootState)=>state.user.token)
    const updatedMealId= useSelector((state: RootState)=>state.meal.updatedMealId)
    const name= useSelector((state: RootState)=>state.meal.name)
    const description= useSelector((state: RootState)=>state.meal.description)
    //const file= useSelector((state: RootState)=>state.file.file)
    const {sendRequest}= useHttpClient()

    //不管是update还是create都要用这个键
    const handleMealSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = data.get('name');
        const description = data.get('description');
        if(isUpdate){
            try {
                await sendRequest(import.meta.env.VITE_BACKEND_URL+`/meals/${updatedMealId}`,"PATCH",JSON.stringify({
                  name,
                  description
                }), {"Content-Type":"application/json", Authorization:"Bearer "+token})
                dispatch(setForceRender())
              } catch (err) {
                console.log("something wrong when want to update a meal")
              }
        }else{
            if(file){
                try {
                    data.append('image',file!)
                    await sendRequest(`${import.meta.env.VITE_BACKEND_URL}/meals`,"POST",data,{
                      Authorization:"Bearer "+token
                    })
                    dispatch(setPreviewUrl(null))
                    dispatch(setForceRender())
                } catch (err) {
                    console.log("something wrong when want to create a meal")
                }
            }else{
                console.log("please upload an image")
            }
            
        }
        if(isUpdate){
            dispatch(closeButton());
        }
        dispatch(setName(''))
        dispatch(setDescription(''))
        
    }

    // when is the updateMeal mode: need a button to close the backdrop
    const handleButtonClose=()=>{
        dispatch(closeButton());
        dispatch(setName(''))
        dispatch(setDescription(''))
    }

    return (
        <div className='create-meal-card'>
            {
                isUpdate&& (
                    <button onClick={handleButtonClose} className='closeUpdateMeal-button'>X</button>
                )
            }
            <form onSubmit={handleMealSubmit}>
                <ImageUpload profilePicture={false} file={file} setFile={setFile}/>
                
                <input
                    type="text"
                    placeholder="Meal Name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <button type="submit">SUBMIT</button>
            </form>
            {
                !isUpdate&& <span>Create your own favorite meal</span>
            }
            
        </div>
    )
}
export default CreateMealOrUpdateCard