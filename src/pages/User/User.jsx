import { useContext, useEffect } from "react"
import { Button } from "antd"
import MainData from "../../context/mainContext"
import {useNavigate} from "react-router-dom"
import UserEditModal from "../../components/UserEditModal"
import { LockOutlined } from '@ant-design/icons';

function User() {
  let {user,showModal} = useContext(MainData)
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
            <h1>{user?.isPrivate?(<LockOutlined />):null}{user?.username}</h1> 
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
          <Button onClick={showModal} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529",marginTop:"20px"}} >Edit</Button>
        </div>
        
      </div>
      <UserEditModal />
    </>
  )
}

export default User
