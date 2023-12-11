import { Button, Input } from "antd"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MainData from "../context/mainContext"
import { getAllUsers } from "../services/api/userRequests"
import { PlusSquareOutlined, HomeOutlined } from '@ant-design/icons';
function Header() {
  let {user,token,setUser,setToken} = useContext(MainData)
  let [users,setUsers] = useState([])
  let [search,setSearch] = useState("")
  
  useEffect(()=>{
    getAllUsers()
    .then(data=>{setUsers(data)})
  },[token])
  return (
    <>
      <header>
        <nav className="container">
            <div className="logo">
                <img style={{width:"150px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Rockstar_Games_Social_Club_Logo.svg/2560px-Rockstar_Games_Social_Club_Logo.svg.png" alt="logo" />
            </div>
            {token? 
            <div className="search-bar">
              <Input className="search-input" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search users..." />
              <div className="finded-users">
                <ul>
                  {users.filter(item=>item.username.toLowerCase().includes(search.toLowerCase().trim()) && item.id != user.id).map((item,idx)=>{
                    return(<Link to={`visit/user/${item.id}`} style={{textDecoration:"none",color:"#FCB010"}} key={idx}><li style={{display:"flex",alignItems:"center"}}><img src={item.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",marginRight:"20px",border:"2px solid #FCB010"}} /> {item.username}</li></Link>)
                  })}

                </ul>
              </div>
            </div>
            :null}
            <div className="buttons">
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
                    <Link style={{color:"#FCB010"}} to="/feed">
                    <HomeOutlined style={{height:"32px", fontSize:"32px"}} />
                    </Link>
                    <Link to="/">
                        {/* <Button style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >{user?.username}</Button> */}
                        <img src={user?.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid #FCB010"}} />
                    </Link>
                    <Link style={{color:"#FCB010"}} to="/add">
                    <PlusSquareOutlined style={{height:"32px", fontSize:"32px"}} />
                    </Link>
                    <Link to="/login">
                        <Button onClick={()=>{setUser({});setToken("");localStorage.setItem("token",'""')}} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >Logout</Button>
                    </Link>
                </>)}
            </div>
        </nav>
      </header>
    </>
  )
}

export default Header
