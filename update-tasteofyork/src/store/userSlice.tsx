import { createSlice} from '@reduxjs/toolkit';

interface UserState{
    userId: string | null;
    avatar: string | undefined;
    token: string | null;
    tokenExpirationDate: string | null;
}

const initialState:UserState={
    userId: null,
    avatar: undefined,
    token: null,
    tokenExpirationDate: new Date(new Date().getTime() + 1000 * 60 * 2).toISOString()
}

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state, action)=>{
            console.log(action.payload)
            const { userId, avatar, token} = action.payload;
            console.log(userId)
            state.userId = userId;
            state.avatar = avatar;
            state.token = token;

            localStorage.setItem(
                'userData',
                JSON.stringify({userId:userId, token:token,avatar:avatar, expiration:state.tokenExpirationDate})
            )
        },
        logout:(state)=>{
            state.userId = null;
            state.avatar = undefined;
            state.token = null;
            state.tokenExpirationDate = null;
            localStorage.removeItem('userData')
        }
    }
})

export const {login, logout}= userSlice.actions
export default userSlice.reducer