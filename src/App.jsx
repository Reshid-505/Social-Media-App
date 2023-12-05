import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { ROUTES } from "./routes"
import MainData from "./context/mainContext"
import { useEffect, useState } from "react"

function App() {
  let router = createBrowserRouter(ROUTES)
  let [user,setUser] = useState({})
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("user"))){
      setUser(JSON.parse(localStorage.getItem("user")))
    }else{
      localStorage.setItem("user",JSON.stringify(user))
    }
  },[])
  let data={
    user,
    setUser
  }
  return (
    <MainData.Provider value={data}>
      <RouterProvider router={router} />
    </MainData.Provider>
  )
}

export default App
