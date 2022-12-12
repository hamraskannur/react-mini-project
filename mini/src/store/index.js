import {configureStore} from "@reduxjs/toolkit"
import UserAthu from "./UserAthu"
import AdminAthu from "./AdminAthu"

const Store=  configureStore(
    {reducer:{ user:UserAthu.reducer ,Admin:AdminAthu.reducer}
}
)

export default Store