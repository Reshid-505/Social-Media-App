import {PropTypes} from "prop-types"
import { useContext, useEffect, useState } from "react"
import MainData from "../context/mainContext"
import { HeartOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons';
import { editUser, getByIdUser } from "../services/api/userRequests";
function Post({initPostData}) {
    let {user,showCommentModal,setPostCommentData,setPostCommentUser} = useContext(MainData)
    let [postData,setPostData] = useState(initPostData) 
    let [postUser,setPostUser] = useState({})
    useEffect(()=>{
        getByIdUser(postData.userId)
        .then(data=>{
            setPostUser(data)
        })
    },[])
    function handleLike(){
        if(!postData?.likes?.includes(user.id)){
            let temporaryData = {...postUser}
            temporaryData.posts.find(item=>item.id==postData.id).likes.push(user.id)
            editUser(postUser.id,temporaryData)
            setPostUser(temporaryData)
            setPostData(temporaryData?.posts?.find(item=>item.id==initPostData.id))

        }
        
    }
    function handleUnLike(){
        if(postData?.likes?.includes(user.id)){
            let temporaryData = {...postUser}
            temporaryData.posts.find(item=>item.id==postData.id).likes.filter(item=>item!=user.id)
            let likedIdx = temporaryData.posts.find(item=>item.id==postData.id).likes.indexOf(user.id)
            temporaryData.posts.find(item=>item.id==postData.id).likes.splice(likedIdx,1)
            editUser(postUser.id,temporaryData)
            setPostUser(temporaryData)
            setPostData(temporaryData?.posts?.find(item=>item.id==postData.id))
        }
    }
  return (

    <>
      <div className="post">
        <div className="post-header">
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}><img src={postUser?.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid #FCB010"}} />{postUser?.username}</div>
        </div>
        <div className="post-image">
            <img src={postData.image} alt=""/>
        </div>
        <div className="post-footer">
            <div className="buttons">
              {postData?.likes?.includes(user.id)?
              <><HeartFilled onClick={handleUnLike} style={{color:"#F31212"}} /> {postData?.likes?.length}</>:
              <><HeartOutlined onClick={handleLike} style={{color:"#F31212"}} /> {postData?.likes?.length}</>
              }
              <CommentOutlined onClick={()=>{showCommentModal();setPostCommentData(postData);setPostCommentUser(postUser)}} />
            </div>
            <div className="desc">
            <p><b>{postUser?.username}:</b> {postData.description}</p>
            </div>
        </div>
      </div>
    </>
  )
}
Post.propTypes={
    initPostData:PropTypes.object
}
export default Post
