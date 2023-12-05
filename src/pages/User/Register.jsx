import { Button, Form, Checkbox, Input } from 'antd';
import { addUser, getAllUsers } from '../../services/api/userRequests';
import { useContext, useEffect } from 'react';
import MainData from '../../context/mainContext';
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

function Register() {
    let {user}=useContext(MainData)
    let navigate = useNavigate()
    useEffect(()=>{
      if(JSON.stringify(user)!="{}"){
        navigate("/")
      }
    },[user])
    const onFinish = (values) => {
        getAllUsers()
        .then(datas=>{
            let count=0
            datas.forEach(item=>{
              if(item.username==values.username || item.email==values.email){
                count++
              }
            })
            if(count){
              toast.error("this name or email is already in use ")
            }else{
              addUser()
              toast.success("your account is ready please login")
              navigate("/login")
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
                  min:3,
                  message: 'Please input your username!',
                  },
              ]}
              >
              <Input />
              </Form.Item>

              <Form.Item
              label="Email"
              name="email"
              rules={[
                  {
                  required: true,
                  pattern:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Please input your email!',
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
                  pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g,
                  message: 'Please input your password!',
                  },
              ]}
              >
              <Input.Password />
              </Form.Item>

              <Form.Item
              label="Bio"
              name="bio"
              rules={[
                  {
                  max:40,
                  message: 'Bio must be less than 40 characters!',
                  },
              ]}
              >
              <Input />
              </Form.Item>

              <Form.Item
                name="Private"
                valuePropName="checked"
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Checkbox style={{color:"#FFF"}}>Private</Checkbox>
              </Form.Item>

              <Form.Item
              wrapperCol={{
                  offset:4,
                  span: 16,
              }}
              >
              <Button type="primary" htmlType="submit">
                  Register
              </Button>
              </Form.Item>

          </Form>
          
        </div>

    </>
  )
}

export default Register
