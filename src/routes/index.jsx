import Admin from "../pages/Admin/Admin";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminLayout from "../pages/Admin/UserLayout";
import AddPost from "../pages/User/AddPost";
import Feed from "../pages/User/Feed";
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
                path:"/Feed",
                element:<Feed />
            },
            {
                path:"/visit/user/:id",
                element:<VisitedUser />
            },
        ]
    },
    {
        path:"/admin",
        element:<AdminLayout />,
        children:[
            {
                index:true,
                element:<Admin />
            },
            {
                path:"login",
                element:<AdminLogin />
            }
        ]
    }
]