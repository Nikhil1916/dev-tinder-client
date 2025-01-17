import { createSlice } from '@reduxjs/toolkit'
const initialState = null;

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser:(_state, action) => {
        return action.payload
    },
    removeUser:() => {
        return null;
    }
  },
})

export const { addUser , removeUser } = userSlice.actions
export default userSlice.reducer