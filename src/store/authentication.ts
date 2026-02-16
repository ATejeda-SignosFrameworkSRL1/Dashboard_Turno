import { createSlice } from '@reduxjs/toolkit'

const sessionLogin = sessionStorage.getItem("nombre");

const initialState = {
    // state can be 'authenticated' | 'no-authenticated';
    isAuthenticated: sessionLogin ? true : false,

}


export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    updateAuthenticationState: (state, {payload}) => {
      state.isAuthenticated = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateAuthenticationState } = authenticationSlice.actions

export default authenticationSlice.reducer