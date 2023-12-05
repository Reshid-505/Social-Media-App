import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { ROUTES } from "./routes"
import MainData from "./context/mainContext"
import { useEffect, useState } from "react"

function App() {
  let router = createBrowserRouter(ROUTES)
  let [user,setUser] = useState({})
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);

  const showEditModal = () => {
    setIsEditUserModalOpen(true);
  };

  const handleEditOk = () => {
    setIsEditUserModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditUserModalOpen(false);
  };
  const showEditPasswordModal = () => {
    setIsEditPasswordModalOpen(true);
  };

  const handleEditPasswordOk = () => {
    setIsEditPasswordModalOpen(false);
  };

  const handleEditPasswordCancel = () => {
    setIsEditPasswordModalOpen(false);
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
    isEditUserModalOpen,
    isEditPasswordModalOpen,
    showEditModal,
    handleEditCancel,
    handleEditOk,
    showEditPasswordModal,
    handleEditPasswordCancel,
    handleEditPasswordOk
  }
  return (
    <MainData.Provider value={data}>
      <RouterProvider router={router} />
    </MainData.Provider>
  )
}

export default App
