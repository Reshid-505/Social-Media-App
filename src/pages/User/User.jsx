import { useContext, useEffect } from "react"
import MainData from "../../context/mainContext"
import {useNavigate} from "react-router-dom"

function User() {
  let {user} = useContext(MainData)
  let navigate = useNavigate()

  useEffect(()=>{
    if(JSON.stringify(user)=="{}"){
      navigate("/login")
    }
  },[user])
  return (
    <>
      <div className="container">
        <div className="user-data">
          <div className="avatar">
            <img src={user?.avatar} alt="avatar" style={{width:"100px",height:"100px",borderRadius:"50%"}} />
          </div>
          <div className="info">
            <h1>{user?.name}</h1> 
            <div className="stats" style={{margin:"20px 0",display:"flex",gap:"40px"}}>
              <div>
                <h3>Posts</h3>
                <p>{user?.posts?.length}</p> 
              </div>
              <div>
                <h3>Followers</h3>
                <p>{user?.followers?.length}</p> 
              </div>
              <div>
                <h3>Follows</h3>
                <p>{user?.follows?.length}</p> 
              </div>
            </div>
            <div>
              {user?.bio}
            </div>
          </div>
          
        </div>
        
      </div>
    </>
  )
}

export default User
