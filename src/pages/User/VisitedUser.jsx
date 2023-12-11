import { useContext, useEffect, useState } from "react"
import { Button, Row, Col } from "antd"
import { LockOutlined } from '@ant-design/icons';
import { editUser, getByIdUser } from "../../services/api/userRequests";
import { useParams } from "react-router-dom"
import MainData from "../../context/mainContext";
import UserPostDetail from "../../components/UserPostDetail";
// import {useNavigate} from "react-router-dom"

function VisitedUser() {
  let [visitedUser,setVisitedUser]=useState({})
  let {id} = useParams()
  // let navigate = useNavigate()
  let {user,setUser,setPost,showPostModal} = useContext(MainData)
  // useEffect(()=>{
  //   if(JSON.stringify(user)=="{}"){
  //     navigate("/login")
  //   }
  // },[user])

  useEffect(()=>{
    getByIdUser(id)
    .then((data)=>{
        setVisitedUser(data)
    })
  },[id])
  function handleFollow(){
    if(!visitedUser.followers.includes(user.id) && !visitedUser.requests.includes(user.id) ){
      if(visitedUser.isPrivate){
        let data={
          username: visitedUser.username,
          password: visitedUser.password,
          avatar:visitedUser.avatar,
          followers: visitedUser.followers,
          follows: visitedUser.follows,
          requests: [...visitedUser.requests,(user.id)],
          isAdmin: visitedUser.isAdmin,
          isVerified: visitedUser.isVerified,
          isPrivate: visitedUser.isPrivate,
          email: visitedUser.email,
          posts: visitedUser.posts,
          fullname: visitedUser.fullname,
          bio:visitedUser.bio,
          blocks: visitedUser.blocks,
        }
        editUser(visitedUser.id,data)
        .then(data=>{
          setVisitedUser(data)
        })
      }else{
        let data={
          username: visitedUser.username,
          password: visitedUser.password,
          avatar:visitedUser.avatar,
          followers: [...visitedUser.followers,(user.id)],
          follows: visitedUser.follows,
          requests: visitedUser.requests,
          isAdmin: visitedUser.isAdmin,
          isVerified: visitedUser.isVerified,
          isPrivate: visitedUser.isPrivate,
          email: visitedUser.email,
          posts: visitedUser.posts,
          fullname: visitedUser.fullname,
          bio:visitedUser.bio,
          blocks: visitedUser.blocks,
        }
        let data2={
          username: user.username,
          password: user.password,
          avatar:user.avatar,
          followers: user.followers,
          follows: [...user.follows,(visitedUser.id)],
          requests: user.requests,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          isPrivate: user.isPrivate,
          email: user.email,
          posts: user.posts,
          fullname: user.fullname,
          bio:user.bio,
          blocks: user.blocks,
        }
        editUser(visitedUser.id,data)
        .then(data=>{
          setVisitedUser(data)
        })
        editUser(user.id,data2)
        .then(data=>{
          setUser(data)
        })        
      }
    }else if(visitedUser.followers.includes(user.id)){
      let data={
        username: visitedUser.username,
        password: visitedUser.password,
        avatar:visitedUser.avatar,
        followers: [...visitedUser.followers.filter(item=>item!=user.id)],
        follows: visitedUser.follows,
        requests: visitedUser.requests,
        isAdmin: visitedUser.isAdmin,
        isVerified: visitedUser.isVerified,
        isPrivate: visitedUser.isPrivate,
        email: visitedUser.email,
        posts: visitedUser.posts,
        fullname: visitedUser.fullname,
        bio:visitedUser.bio,
        blocks: visitedUser.blocks,
      }
      let data2={
        username: user.username,
        password: user.password,
        avatar:user.avatar,
        followers: user.followers,
        follows: [...user.follows.filter(item=>item!=visitedUser.id)],
        requests: user.requests,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        isPrivate: user.isPrivate,
        email: user.email,
        posts: user.posts,
        fullname: user.fullname,
        bio:user.bio,
        blocks: user.blocks,
      }
      editUser(visitedUser.id,data)
      .then(data=>{
        setVisitedUser(data)
      })
      editUser(user.id,data2)
      .then(data=>{
        setUser(data)
      })
    }

  }
  return (
    <>
      <div className="container">
        <div className="user-data">
          <div className="avatar">
            <img src={visitedUser?.avatar} alt="avatar" />
          </div>
          <div className="info">
            <h1>{visitedUser?.isPrivate?(<LockOutlined />):null} {visitedUser?.username}</h1> 
            <div className="stats">
              <div>
                <h3>Posts</h3>
                <p>{visitedUser?.posts?.length}</p> 
              </div>
              <div>
                <h3>Followers</h3>
                <p>{visitedUser?.followers?.length}</p> 
              </div>
              <div>
                <h3>Follows</h3>
                <p>{visitedUser?.follows?.length}</p> 
              </div>
            </div>
            <div>
              {visitedUser?.bio}
            </div>
            <div style={{fontWeight:"bold",marginTop:"10px"}}>
              {visitedUser?.fullname}
            </div>
          </div>
          <div>
            {visitedUser?.followers?.includes(user.id)?(
              <Button onClick={handleFollow} style={{background:"#00000000",color:"#FCB010",borderColor:"#FCB010",marginTop:"20px",marginRight:"20px"}} >Unfollow</Button>
              ):visitedUser?.requests?.includes(user.id)?(
              <Button onClick={handleFollow} style={{background:"#00000000",color:"#FCB010",borderColor:"#FCB010",marginTop:"20px",marginRight:"20px"}} >Pending</Button>
              ):(
              <Button onClick={handleFollow} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529",marginTop:"20px",marginRight:"20px"}} >Follow</Button>
            )}
          </div>
        </div>
        {!visitedUser.isPrivate || user?.follows?.includes(visitedUser.id) && 
        <Row style={{width:"70%",margin:"0 auto 50px"}}>
          {visitedUser?.posts?.map(item=>
            <Col md={8} sm={12} xs={24} key={item.id}><img onClick={()=>{setPost(item);showPostModal()}} style={{width:"100%",aspectRatio:"1/1",objectFit:"cover"}} src={item.image} alt="post" /></Col>  
          )}
        </Row>
        }
        
      </div>
      <UserPostDetail />
    </>
  )
}

export default VisitedUser
