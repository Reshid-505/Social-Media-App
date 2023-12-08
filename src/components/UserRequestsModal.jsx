import { ConfigProvider, theme, Modal, Button, List } from 'antd';
import { useContext, useEffect, useState } from 'react';
import MainData from '../context/mainContext';
import { editUser, getByIdUser } from '../services/api/userRequests';

function UserRequestsModal() {
    let {user,setUser,isRequestsModalOpen,handleRequestsCancel,handleRequestsOk} = useContext(MainData)
    const { darkAlgorithm } = theme;
    let [userList,setUserList] = useState([])
    // useEffect(()=>{
    //     setUserList(user?.requests?.map((item)=>{getByIdUser(item)}))
    // },[])
    useEffect(() => {
      if (isRequestsModalOpen) {
          getUserData();
      }
  }, [isRequestsModalOpen, user]);

  const getUserData = async () => {
      try {
          const requestsPromises = user.requests.map((item) => getByIdUser(item));
          const responses = await Promise.all(requestsPromises);
          setUserList(responses);
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };
  function handleReject(id){
    if(user.requests.includes(id)){
      let data={
        username: user.username,
        password: user.password,
        avatar:user.avatar,
        followers: user.followers,
        follows: user.follows,
        requests: [...user.requests.filter(item=>item!=id)],
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        isPrivate: user.isPrivate,
        email: user.email,
        posts: user.posts,
        fullname: user.fullname,
        bio:user.bio,
        stories: user.posts,
      }
      editUser(user.id,data)
      .then((data)=>{
        setUser(data)
      })
    }
    }
  function handleAccept(id){
    if(!user.followers.includes(id)){
      let data={
        username: user.username,
        password: user.password,
        avatar:user.avatar,
        followers:  [...user.followers,(id)],
        follows: user.follows,
        requests: [...user.requests.filter(item=>item!=id)],
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        isPrivate: user.isPrivate,
        email: user.email,
        posts: user.posts,
        fullname: user.fullname,
        bio:user.bio,
        stories: user.posts,
      }
      getByIdUser(id)
      .then((visitedUser)=>{
        let data2={
          username: visitedUser.username,
          password: visitedUser.password,
          avatar:visitedUser.avatar,
          followers: visitedUser.followers,
          follows: [...visitedUser.follows,user.id],
          requests: visitedUser.requests,
          isAdmin: visitedUser.isAdmin,
          isVerified: visitedUser.isVerified,
          isPrivate: visitedUser.isPrivate,
          email: visitedUser.email,
          posts: visitedUser.posts,
          fullname: visitedUser.fullname,
          bio:visitedUser.bio,
          stories: visitedUser.posts,
        }
        editUser(id,data2)
      })
      editUser(user.id,data)
        .then((data)=>{
          setUser(data)
        }
      )
    }
  }
    // console.log(userList)
  return (
    <> 
      <ConfigProvider
      theme={{
        algorithm: darkAlgorithm
      }}>
        <Modal footer={null} title="Requests" open={isRequestsModalOpen} onOk={handleRequestsOk} onCancel={handleRequestsCancel}>
          <List
          size="small"
          bordered
          dataSource={userList}
          renderItem={(item) => <List.Item style={{display:"flex",justifyContent:"space-between"}}>{item.username}<div className='buttons' style={{display:"flex",gap:"10px"}}><Button onClick={()=>{handleAccept(item.id)}} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >Accept</Button><Button onClick={()=>{handleReject(item.id)}} style={{background:"#F31212",borderColor:"#F31212",color:"#FFFFFF"}} >Reject</Button></div></List.Item>}
          />
        </Modal>
      </ConfigProvider>
    </>

  )
}

export default UserRequestsModal
