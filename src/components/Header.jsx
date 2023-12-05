import { Button, Input } from "antd"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MainData from "../context/mainContext"
import { getAllUsers } from "../services/api/userRequests"
function Header() {
  let {user,setUser} = useContext(MainData)
  let [users,setUsers] = useState([])
  useEffect(()=>{
    getAllUsers()
    .then(data=>{setUsers(data)})
  },[user])
  return (
    <>
      <header style={{backgroundColor:"#1E2225",padding:"10px 0"}}>
        <nav className="container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div className="logo">
                <img style={{width:"150px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Rockstar_Games_Social_Club_Logo.svg/2560px-Rockstar_Games_Social_Club_Logo.svg.png" alt="logo" />
            </div>
            <div style={{justifySelf:"center"}}>
              <Input placeholder="Search users..." />
              {/* <div className="finded-users">
                <ul>
                  <li>reshid</li>
                  <li>reshid</li>
                  <li>reshid</li>
                  <li>reshid</li>
                </ul>
              </div> */}
            </div>
            <div className="buttons" style={{display:"flex",gap:"20px"}}>
                {JSON.stringify(user)=="{}"? (
                  <>
                    <Link to="/login">
                        <Button style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >Register</Button>
                    </Link>
                  </>
                ):
                (<> 
                    <Link to="/">
                        {/* <Button style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >{user?.username}</Button> */}
                        <img src={user?.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid #FCB010"}} />
                    </Link>
                    <Link to="/login">
                        <Button onClick={()=>{setUser({});localStorage.setItem("user","{}")}} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >Logout</Button>
                    </Link>
                </>)}
            </div>
        </nav>
      </header>
    </>
  )
}

export default Header
