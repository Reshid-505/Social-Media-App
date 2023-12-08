import AddPost from "../pages/User/AddPost";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import User from "../pages/User/User";
import UserLayout from "../pages/User/UserLayout";
import VisitedUser from "../pages/User/VisitedUser";

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
            {
                path:"/add",
                element:<AddPost />
            },
            {
                path:"/visit/user/:id",
                element:<VisitedUser />
            },
        ]

    }
]