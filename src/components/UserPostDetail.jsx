import { ConfigProvider, theme, Modal } from 'antd';
import { useContext, useEffect, useState } from 'react';
import MainData from '../context/mainContext';
import { getByIdUser } from '../services/api/userRequests';
function UserPostDetail() {
  const { darkAlgorithm } = theme;
  let{isPostModalOpen,handlePostOk,handlePostCancel,post} = useContext(MainData)
  let [user,setUser] = useState({})
  useEffect(()=>{
    getByIdUser(post.userId)
    .then(data=>{
      setUser(data)
    })
  },[post])
  return (
    <div>
      <ConfigProvider
      theme={{
        algorithm: darkAlgorithm
      }}>
        <Modal title={<div style={{display:"flex",alignItems:"center",gap:"20px"}}><img src={user?.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid #FCB010"}} />{user.username}</div>} footer={null} open={isPostModalOpen} onOk={handlePostOk} onCancel={handlePostCancel}>
            <img src={post.image} alt="post" width={"100%"} />
            <h2>{post.description}</h2>
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default UserPostDetail
