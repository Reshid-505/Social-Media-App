import Header from "../../components/Header"
import { Outlet } from "react-router-dom"

function UserLayout() {
  return (
    <>
     <Header />
     <Outlet /> 
    </>
  )
}

export default UserLayout
