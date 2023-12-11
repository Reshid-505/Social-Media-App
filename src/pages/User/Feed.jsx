import { useContext, useEffect, useState } from "react"
import MainData from "../../context/mainContext"
import { getByIdUser } from "../../services/api/userRequests"
import Post from "../../components/Post"
import PostComment from "../../components/PostComment"

function Feed() {
    let{user} = useContext(MainData) 
    let [posts,setPosts]=useState([])
    useEffect(function(){
        setPosts([])
        user?.follows?.map(userId=>{
            getByIdUser(userId)
            .then(data=>setPosts([...posts,...data.posts].sort((a,b)=>b.createdAt-a.createdAt)))
        })
        // setPosts([...posts.sort((a,b)=>a.createdAt-b.createdAt)])
    },[user])
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"40px", padding:"40px 0"}}>
      {posts.map((item,idx)=>{return(<Post key={idx} initPostData={item}  />)})}
      <PostComment />
    </div>
  )
}

export default Feed
