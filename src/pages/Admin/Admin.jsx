import { useEffect, useState } from "react";
import { Table, ConfigProvider, theme, } from "antd";
import { getAllUsers } from "../../services/api/userRequests";
import { useContext } from 'react';
import MainData from '../../context/mainContext';
import {useNavigate} from "react-router-dom"


function Admin() {
    let navigate = useNavigate()
    let {admin}=useContext(MainData)
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
    <div className="container" style={{marginTop:"50px"}}>
        <ConfigProvider
        theme={{
            algorithm: darkAlgorithm
        }}>
            <Table dataSource={dataSource} columns={columns} />
        </ConfigProvider>
    </div>
  )
}

export default Admin
