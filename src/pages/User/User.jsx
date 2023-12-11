import { useContext, useEffect, useState } from "react"
import { Button, Row, Col, Modal, List, ConfigProvider, theme } from "antd"
import MainData from "../../context/mainContext"
import {useNavigate} from "react-router-dom"
import UserEditModal from "../../components/UserEditModal"
import { LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import UserPasswordEditModal from "../../components/UserPasswordEditModal"
import UserRequestsModal from "../../components/UserRequestsModal"
import UserPostDetail from "../../components/UserPostDetail"
import { getByIdUser } from "../../services/api/userRequests"
import { addVerifie, getAllVerifies } from "../../services/api/verifieRequests"

function User() {
  const { darkAlgorithm } = theme;
  let {user,token,showEditModal,showEditPasswordModal,showRequestsModal,showPostModal,setPost,} = useContext(MainData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlSendVerifie = async () => {
    if(!user.isVerified){
      // console.log("test1")
      let counter=0
      await getAllVerifies()
      .then(datas=>
        datas.forEach(elem => {
          if(elem.userId==user.id){
            counter++
          }
        }))
        if(!counter){
          
          console.log("test2")
          addVerifie({userId:user.id})
        }
    }
  };
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
            <h1>{user?.isPrivate?(<LockOutlined style={{color:"#FCB010"}} />):null} {user?.username} {user?.isVerified && <CheckCircleOutlined style={{color:"#FCB010"}} />}</h1> 
            <div className="stats">
              <div>
                <h3>Posts</h3>
                <p>{user?.posts?.length}</p> 
              </div>
              <div>
                <h3 onClick={async ()=>{
                setModalData([])
                try {
                  const requestsPromises = user?.followers?.map((item) => getByIdUser(item));
                  const responses = await Promise.all(requestsPromises);
                  setModalData(responses);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
                showModal()
              }}>Followers</h3>
                <p>{user?.followers?.length}</p> 
              </div>
              <div onClick={async()=>{
                setModalData([])
                try {
                  const requestsPromises = user?.follows?.map((item) => getByIdUser(item));
                  const responses = await Promise.all(requestsPromises);
                  setModalData(responses);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
                showModal()
              }}>
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
          {!user?.isVerified && <Button onClick={handlSendVerifie} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529",marginTop:"20px"}} >Verifie Request</Button>}
          </div>
        </div>
        <Row style={{width:"70%",margin:"0 auto 50px"}}>
          {user?.posts?.map(item=>
            <Col md={8} sm={12} xs={24} key={item.id}><img onClick={()=>{setPost(item);showPostModal();console.log(item)}} style={{width:"100%",aspectRatio:"1/1",objectFit:"cover"}} src={item.image} alt="post" /></Col>  
          )}
        </Row>
      </div>
      <ConfigProvider
      theme={{
        algorithm: darkAlgorithm
      }}>
        <Modal  footer={null} title="Change password" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <List
            size="small"
            bordered
            dataSource={modalData}
            renderItem={(item) => <List.Item style={{display:"flex",justifyContent:"space-between"}}><img src={item.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",marginRight:"20px",border:"2px solid #FCB010"}} /> {item.username}<div className='buttons' style={{display:"flex",gap:"10px"}}></div></List.Item>}
            />
        </Modal>
      </ConfigProvider>
      <UserEditModal />
      <UserPasswordEditModal />
      <UserRequestsModal />
      <UserRequestsModal />
      <UserPostDetail />
    </>
  )
}

export default User
