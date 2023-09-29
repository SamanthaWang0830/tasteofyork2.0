import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface mealState {
    isOpen: boolean;
    updatedMealId: string | null;
    name:string;
    description:string;
    forceRender: number;
}

const initialState: mealState = {
    isOpen: false,
    updatedMealId: null,
    name:'',
    description:'',
    forceRender:0,
};

const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {
      openButton: (state) => {
        state.isOpen = true;
      },
      closeButton: (state) => {
        state.isOpen = false;
      },
      setUpdatedMealId:(state, action: PayloadAction<string | null>) => {
        state.updatedMealId = action.payload;
      },
      setForceRender:(state) => {
        state.forceRender = state.forceRender +1
      },
      setName: (state, action: PayloadAction<string >) => {
        state.name = action.payload;
      },
      setDescription: (state, action: PayloadAction<string>) => {
        state.description = action.payload;
      },
    },
});

export const { openButton, closeButton, setUpdatedMealId,setForceRender,setName, setDescription} = mealSlice.actions;
export default mealSlice.reducer;