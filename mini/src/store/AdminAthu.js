import { createSlice } from "@reduxjs/toolkit"

const AdminAthu=createSlice({
    name: "Admin",
    initialState: {
        AdminToken: null
    },
    reducers:{
        AddAdmin(state,actions){
            const newitem =actions.payload;
            state.AdminToken=newitem.token
        },
        AdminLogout(state,actions){
            state.AdminToken=""
        }
    }
})


export const AdminActions=AdminAthu.actions
export default AdminAthu
