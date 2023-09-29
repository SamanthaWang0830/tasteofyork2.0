import { createSlice} from '@reduxjs/toolkit';

interface mapButtonState {
    isOpen: boolean;
}

const initialState: mapButtonState = {
    isOpen: false,
};

const mapButtonSlice = createSlice({
    name: 'mapButton',
    initialState,
    reducers: {
      openButton: (state) => {
        state.isOpen = true;
      },
      closeButton: (state) => {
        state.isOpen = false;
      },
    },
});

export const { openButton, closeButton } = mapButtonSlice.actions;
export default mapButtonSlice.reducer;