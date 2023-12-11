import AdminHeader from "../../components/AdminHeader"
import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <>
     <AdminHeader />
     <Outlet /> 
    </>
  )
}

export default AdminLayout
