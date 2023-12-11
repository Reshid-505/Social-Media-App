import { useContext, useEffect } from "react"
import { Button, Row, Col } from "antd"
import MainData from "../../context/mainContext"
import {useNavigate} from "react-router-dom"
import UserEditModal from "../../components/UserEditModal"
import { LockOutlined } from '@ant-design/icons';
import UserPasswordEditModal from "../../components/UserPasswordEditModal"
import UserRequestsModal from "../../components/UserRequestsModal"
import UserPostDetail from "../../components/UserPostDetail"

function User() {
  let {user,token,showEditModal,showEditPasswordModal,showRequestsModal,showPostModal,setPost,} = useContext(MainData)
  let navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate("/login")
    }
  },[token])
  return (
    <>
      <div className="container">
        <div className="user-data">
          <div className="avatar">
            <img src={user?.avatar} alt="avatar" />
          </div>
          <div className="info">
            <h1>{user?.isPrivate?(<LockOutlined />):null} {user?.username}</h1> 
            <div className="stats">
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
            <div style={{fontWeight:"bold",marginTop:"10px"}}>
              {user?.fullname}
            </div>
          </div>
          <div className="user-buttons">
          <Button onClick={showEditModal} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529",marginTop:"20px"}} >Edit</Button>
          <Button onClick={showEditPasswordModal} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529",marginTop:"20px"}} >Change password</Button>
          {user?.isPrivate && <Button onClick={showRequestsModal} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529",marginTop:"20px"}} >Requests</Button>}
          </div>
        </div>
        <Row style={{width:"70%",margin:"0 auto 50px"}}>
          {user?.posts?.map(item=>
            <Col md={8} sm={12} xs={24} key={item.id}><img onClick={()=>{setPost(item);showPostModal();console.log(item)}} style={{width:"100%",aspectRatio:"1/1",objectFit:"cover"}} src={item.image} alt="post" /></Col>  
          )}
        </Row>
      </div>
      <UserEditModal />
      <UserPasswordEditModal />
      <UserRequestsModal />
      <UserRequestsModal />
      <UserPostDetail />
    </>
  )
}

export default User
