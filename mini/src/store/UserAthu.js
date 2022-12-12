import { createSlice } from "@reduxjs/toolkit"

const UserAthu = createSlice({
    name: "user",
    initialState: {
        userToken: null,
        userName: null
    },
    reducers:{
        userAddDetails(state,actions){
        const newitem =actions.payload;
         state.userName=newitem.name
         state.userToken=newitem.token
        },
        userLogout(state,actions){
            state.userName=""
            state.userToken=""
        }
    }
})


export const UserActions= UserAthu.actions

export default UserAthu

