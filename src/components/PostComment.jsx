import { ConfigProvider, theme, Modal, Input } from 'antd';
import { useContext, useState } from 'react';
import MainData from '../context/mainContext';
import { SendOutlined, DeleteOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { editUser } from '../services/api/userRequests';
function PostComment() {
  const { darkAlgorithm } = theme;
  let [commentText,setCommentText] = useState("")
  let{user,isCommentModalOpen,handleCommentOk,handleCommentCancel,postCommentUser,setPostCommentData,postCommentData} = useContext(MainData)
  function handleComment(){
    let temporaryData={...postCommentUser}
    temporaryData.posts.find(item=>item.id==postCommentData.id).comments.push({
        "id":nanoid(),
        "userId":user.id,
        "userName":user.username,
        "text":commentText,
    })
    setPostCommentData(temporaryData.posts.find(item=>item.id==postCommentData.id))
    setCommentText("")
    editUser(postCommentUser.id,temporaryData)
  }
  function handleDeleteComment(id){
    let temporaryData={...postCommentUser}
    temporaryData.posts.find(item=>item.id==postCommentData.id).comments=temporaryData.posts.find(item=>item.id==postCommentData.id).comments.filter(item=>item.id!=id)
    setPostCommentData({...temporaryData.posts.find(item=>item.id==postCommentData.id)})
    // console.log(id)
    console.log(temporaryData.posts.find(item=>item.id==postCommentData.id))
    editUser(postCommentUser.id,temporaryData)
    
  }
  return (
    <div>
      <ConfigProvider
      theme={{
        algorithm: darkAlgorithm
      }}>
        <Modal title={<div style={{display:"flex",alignItems:"center",gap:"20px"}}><img src={postCommentUser?.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid #FCB010"}} />{postCommentUser?.username}</div>} footer={null} open={isCommentModalOpen} onOk={handleCommentOk} onCancel={handleCommentCancel}>
        <p style={{margin:"10px 0"}}><b>{postCommentUser?.username}:</b><br/>{postCommentData.description}</p>
        {postCommentUser?.posts?.find(item=>item.id==postCommentData.id).comments.map((item)=><p key={item.id} style={{margin:"10px 0"}}><b>{item?.userName}:</b><br/>{item.text}{item.userId==user.id?<DeleteOutlined onClick={()=>{handleDeleteComment(item.id)}} style={{color:"#f31212",float:"right",fontSize:"20px",cursor:"pointer"}} />:null}</p>)}
        <div style={{display:"flex",gap:"10px"}}>
            <Input onChange={(e)=>{setCommentText(e.target.value)}} value={commentText} /><SendOutlined onClick={handleComment} />
        </div> 
        </Modal>
      </ConfigProvider>
    </div>
  )
}
export default PostComment
