import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'authentication',
    initialState: {
        loggedIn: false,
        user: null,
        loading: false,
        token: ""
    },
    reducers: {
        login: (state, input) => {
            console.log(input)
            state.loggedIn = input.payload.loggedIn;
            state.user = input.payload.user;
            state.token = input.payload.token;
        },
        setLoading: (state) => {
            state.loading = !state.loading;
        }
    }

})
const { actions, reducer } = AuthSlice

export const { login, setLoading } = actions
export default reducer