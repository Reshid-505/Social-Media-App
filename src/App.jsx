import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { ROUTES } from "./routes"
import MainData from "./context/mainContext"
import { useEffect, useState } from "react"
import { getByIdUser } from "./services/api/userRequests"

function App() {
  let router = createBrowserRouter(ROUTES)
  let [user,setUser] = useState({})
  let [post,setPost] = useState({})
  let [token,setToken] = useState("")
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("token"))){
      setToken(JSON.parse(localStorage.getItem("token")))
    }else{
      localStorage.setItem("token",JSON.stringify(token))
    }
  },[])
  useEffect(()=>{
    if(token){
      getByIdUser(token)
      .then(data=>{
        setUser(data)
      })
    }
  },[token])
//#region modal functions
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
  const showRequestsModal = () => {
    setIsRequestsModalOpen(true);
  };

  const handleRequestsOk = () => {
    setIsRequestsModalOpen(false);
  };

  const handleRequestsCancel = () => {
    setIsRequestsModalOpen(false);
  };
  const showPostModal = () => {
    setIsPostModalOpen(true);
  };

  const handlePostOk = () => {
    setIsPostModalOpen(false);
  };

  const handlePostCancel = () => {
    setIsPostModalOpen(false);
  };
  //#endregion
  let data={
    user,
    setUser,
    post,
    setPost,
    token,
    setToken,
    isPostModalOpen,
    isEditUserModalOpen,
    isEditPasswordModalOpen,
    isRequestsModalOpen,
    showEditModal,
    handleEditCancel,
    handleEditOk,
    showEditPasswordModal,
    handleEditPasswordCancel,
    handleEditPasswordOk,
    showRequestsModal,
    handleRequestsCancel,
    handleRequestsOk,
    showPostModal,
    handlePostCancel,
    handlePostOk
  }
  return (
    <MainData.Provider value={data}>
      <RouterProvider router={router} />
    </MainData.Provider>
  )
}

export default App
