import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState{
    file:any;
    previewUrl: string | ArrayBuffer| null;
}

const initialState: FileState = {
    file: null,
    previewUrl:null
};

const fileSlice=createSlice({
    name:'file',
    initialState,
    reducers:{
        setFile:(state, action:PayloadAction<any>)=>{
            state.file= action.payload
        },
        setPreviewUrl: (state, action: PayloadAction<string | ArrayBuffer| null>) => {
            state.previewUrl = action.payload;
        },
    }
})

export const {setFile,setPreviewUrl } = fileSlice.actions;
export default fileSlice.reducer;
