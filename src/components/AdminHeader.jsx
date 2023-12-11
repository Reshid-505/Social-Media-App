import { Button } from "antd"
import { useContext } from "react"
import { Link } from "react-router-dom"
import MainData from "../context/mainContext"
function AdminHeader() {
  let {admin,setAdmin} = useContext(MainData)
  
  return (
    <>
      <header>
        <nav className="container">
            <div className="logo">
                <img style={{width:"150px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Rockstar_Games_Social_Club_Logo.svg/2560px-Rockstar_Games_Social_Club_Logo.svg.png" alt="logo" />
            </div>
            <div className="buttons">
                {JSON.stringify(admin)=="{}"? (
                  <>
                    <Link to="/admin/login">
                        <Button style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >Login</Button>
                    </Link>
                  </>
                ):
                (<> 
                    <img src={admin?.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid #FCB010"}} />
                    <Link to="/admin/login">
                        <Button onClick={()=>{setAdmin({})}} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >Logout</Button>
                    </Link>
                </>)}
            </div>
        </nav>
      </header>
    </>
  )
}

export default AdminHeader
