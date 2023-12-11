import { Button, Form, Input } from 'antd';
import { getAllUsers } from '../../services/api/userRequests';
import { useContext } from 'react';
import MainData from '../../context/mainContext';
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

function AdminLogin() {
    let {setAdmin}=useContext(MainData)
    let navigate = useNavigate()
    // useEffect(()=>{
    //   if(JSON.stringify(admin)!="{}"){
    //     navigate("/admin")
    //   }
    // },[admin])
    const onFinish = (values) => {
        getAllUsers()
        .then(datas=>{
            let count=0
            datas.forEach(item=>{
              if(item.username==values.username && item.password==values.password && item.isAdmin){

                setAdmin(item)
                navigate("/admin")
              }else{
                count++
              }
            })
            if(datas.length==count){
              toast.error("name or password wrong")
            }
        })
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      
  return (
    <>
        <div className='container'>
          <div><Toaster/></div>
          <Form
              name="basic"
              labelCol={{
              span: 4,
              }}
              wrapperCol={{
              span: 16,
              }}
              style={{
              maxWidth: 600,
              margin:"100px 0"
              }}
              initialValues={{
              remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
              <Form.Item
              label="Username"
              name="username"
              rules={[
                  {
                  required: true,
                  message: 'Please input your username!',
                  },
              ]}
              >
              <Input />
              </Form.Item>

              <Form.Item
              label="Password"
              name="password"
              rules={[
                  {
                  required: true,
                  message: 'Please input your password!',
                  },
              ]}
              >
              <Input.Password />
              </Form.Item>
              <Form.Item
              wrapperCol={{
                  offset:4,
                  span: 16,
              }}
              >
              <Button type="primary" htmlType="submit">
                  Login
              </Button>
              </Form.Item>
          </Form>
        </div>

    </>
  )
}

export default AdminLogin
