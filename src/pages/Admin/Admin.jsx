import { useEffect, useState } from "react";
import { Table, ConfigProvider, theme, Button, Modal, List } from "antd";
import { editUser, getAllUsers, getByIdUser } from "../../services/api/userRequests";
import { useContext } from 'react';
import MainData from '../../context/mainContext';
import {useNavigate} from "react-router-dom"
import { deleteVerifie, getAllVerifies } from "../../services/api/verifieRequests";


function Admin() {
    let navigate = useNavigate()
    let {admin}=useContext(MainData)
    let [isRequestsModalOpen,setIsRequestsModalOpen] = useState(false)
    let [requestsData,setRequestsData] = useState([])
    useEffect(()=>{
      onStart()
    },[isRequestsModalOpen])
    async function onStart(){
      getAllVerifies()
      .then(datas=>{
        setRequestsData(datas.map(item=>item.userId))
      })
      try {
        const requestsPromises = requestsData?.map((item) => getByIdUser(item));
        const responses = await Promise.all(requestsPromises);
        setRequestsData(responses);
      } catch (error) {
          // console.error("Error fetching user data:", error);
      }
    }
    const showRequestsModal = () => {
      setIsRequestsModalOpen(true);
    };
  
    const handleRequestsOk = () => {
      setIsRequestsModalOpen(false);
    };
  
    const handleRequestsCancel = () => {
      setIsRequestsModalOpen(false);
    };
    const handleAccept = (id) => {
      getByIdUser(id)
      .then(user=>{
        user.isVerified=true;
        editUser(user.id,user)
        getAllVerifies()
        .then(data=>{
          deleteVerifie(data.find(item=>item.userId==id).id)
          setRequestsData([...requestsData.filter(item=>item.id!=data.find(item=>item.userId==id).userId)])
      })
      })
    };
    const handleReject = (id) => {
      getAllVerifies()
      .then(data=>{
        deleteVerifie(data.find(item=>item.userId==id).id)
        setRequestsData([...requestsData.filter(item=>item.id!=data.find(item=>item.userId==id).UserId)])
      })
    };
    useEffect(()=>{
      if(JSON.stringify(admin)=="{}"){
        navigate("/admin/login")
      }
    },[admin])
    const { darkAlgorithm } = theme;
    let [dataSource,setDataSource] = useState([])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'uername',
        },        
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        }        
      ];
      useEffect(()=>{
        getAllUsers()
        .then(datas=>{
            setDataSource(datas.map((item,idx)=>{return({key:idx+1,id:item.id,username:item.username,password:item.password})}))
        })
      },[])
      
      
  return (
    <ConfigProvider
    theme={{
        algorithm: darkAlgorithm
    }}>
      <div className="container" style={{marginTop:"50px"}}>
        <Button onClick={showRequestsModal} style={{margin:"0 0 20px"}}>Requests</Button>
        <Table dataSource={dataSource} columns={columns} />
      </div>
      <Modal footer={null} title="Requests" open={isRequestsModalOpen} onOk={handleRequestsOk} onCancel={handleRequestsCancel}>
          <List
          size="small"
          bordered
          dataSource={requestsData}
          renderItem={(item) => <List.Item style={{display:"flex",justifyContent:"space-between"}}>{item.username}<div className='buttons' style={{display:"flex",gap:"10px"}}><Button onClick={()=>{handleAccept(item.id)}} style={{background:"#FCB010",borderColor:"#FCB010",color:"#212529"}} >Accept</Button><Button onClick={()=>{handleReject(item.id)}} style={{background:"#F31212",borderColor:"#F31212",color:"#FFFFFF"}} >Reject</Button></div></List.Item>}
          />
        </Modal>
    </ConfigProvider>
  )
}

export default Admin
