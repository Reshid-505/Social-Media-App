import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { ROUTES } from "./routes"
import MainData from "./context/mainContext"
import { useEffect, useState } from "react"

function App() {
  let router = createBrowserRouter(ROUTES)
  let [user,setUser] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("user"))){
      setUser(JSON.parse(localStorage.getItem("user")))
    }else{
      localStorage.setItem("user",JSON.stringify(user))
    }
  },[])
  let data={
    user,
    setUser,
    isModalOpen,
    showModal,
    handleCancel,
    handleOk
  }
  return (
    <MainData.Provider value={data}>
      <RouterProvider router={router} />
    </MainData.Provider>
  )
}

export default App
