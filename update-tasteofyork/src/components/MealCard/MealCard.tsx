import React from 'react'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import './MealCard.styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import useHttpClient from '../../hooks/http-hook'
import { setDescription, setName } from '../../store/mealSlice'
import { openButton, setUpdatedMealId } from '../../store/mealSlice'

interface MealCardProps {
    pick: any
    likeHandler?: (id: string) => void
    dislikeHandler?: (id: string) => void
    deleteHandler?: any
}

const MealCard: React.FC<MealCardProps> = ({
    pick,
    dislikeHandler,
    likeHandler,
    deleteHandler,
}) => {
    const { name, description, image, likeCount, dislikeCount, _id, creator } =
        pick
    const userId = useSelector((state: RootState) => state.user.userId)
    const isCurrentUserOwner = userId && userId === creator

    const dispatch = useDispatch()

    const { sendRequest } = useHttpClient()

    const fetchMealOriginalInfoHandler = async () => {
        // when click the update button, need let the backdrop show up
        dispatch(openButton())
        dispatch(setUpdatedMealId(_id))
        try {
            const responseData = await sendRequest(
                import.meta.env.VITE_BACKEND_URL + `/meals/${_id}`
            )
            const { name, description } = responseData.meal
            dispatch(setName(name))
            dispatch(setDescription(description))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="meal-card">
                <img src={image} alt={name} />
                <h5>{name}</h5>
                <span>{description}</span>

                {/* if this meal is belonging to the current user: the user can update and delete the meal. If not, the user can like and dislike the meal */}
                {isCurrentUserOwner ? (
                    <div className="button-container">
                        <button onClick={fetchMealOriginalInfoHandler} id={_id}>
                            Update
                        </button>
                        <button onClick={() => deleteHandler(_id)}>
                            Delete
                        </button>
                    </div>
                ) : (
                    <div className="button-container">
                        <button onClick={() => likeHandler!(_id)}>
                            <InsertEmoticonIcon /> {likeCount}
                        </button>
                        <button onClick={() => dislikeHandler!(_id)}>
                            <SentimentVeryDissatisfiedIcon /> {dislikeCount}
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default MealCard
