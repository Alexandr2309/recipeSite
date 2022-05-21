import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUpdate: false
}
const isUpdateSlice = createSlice({
  name: 'isUpdate',
  initialState,
  reducers: {
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload
    }
  }
});

export const { setIsUpdate } = isUpdateSlice.actions;
export default isUpdateSlice.reducer