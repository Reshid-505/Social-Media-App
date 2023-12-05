import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import User from "../pages/User/User";
import UserLayout from "../pages/User/UserLayout";

export let ROUTES=[
    {
        path:"/",
        element:<UserLayout/>,
        children:[
            {
                index:true,
                element:<User />
            },
            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/register",
                element:<Register />
            },
        ]

    }
]