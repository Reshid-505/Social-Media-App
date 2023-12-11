import { Button, Form, Checkbox, Input } from 'antd';
import { addUser, getAllUsers } from '../../services/api/userRequests';
import { useContext, useEffect, useState } from 'react';
import MainData from '../../context/mainContext';
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

function Register() {
    let {token}=useContext(MainData)
    let navigate = useNavigate()
    useEffect(()=>{
      if(token){
        navigate("/")
      }
    },[token])
    let [password,setPassword] = useState("")
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
              let data={
                username: values.username,
                password: values.password,
                avatar:values.avatar?values.avatar:"https://pbs.twimg.com/profile_images/1815864260/lorem-ipsum-logo_400x400.jpeg",
                followers: [],
                follows: [],
                requests: [],
                isAdmin: false,
                isVerified: false,
                isPrivate: values.private,
                email: values.email,
                posts: [],
                fullname: values.fullname?values.fullname:"",
                bio:values.bio?values.bio:"",
                blocks: [],
            }
              addUser(data).then(()=>{
                  toast.success("your account is ready please login")
                  navigate("/login")
                })
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
              span: 6,
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
                  required:true,
                  message: 'Please input your username!',
                  },
                  {
                  min:3,
                  message: 'Username must be more than 3 characters!',
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
                  required:true,
                  message: 'Please input your email!',
                  },
                  {
                  pattern:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Please input valid email!',
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
                  required:true,
                  message: 'Please input your password!',
                  },
                  {
                  pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g,
                  message: 'Password must contain 0ne letter and one number and must be more than 6 character!',
                  },
              ]}
              >
              <Input.Password value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
              </Form.Item>

              <Form.Item
              label="Confirm password"
              name="confirmPassword"
              rules={[
                {
                  required:true,
                  message: 'Please input confirm your password!',
                  },
                  {
                  required: true,
                  validator:(rule,value)=>value==password?Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                  message: 'Your password must be same!',
                  },
              ]}
              >
              <Input.Password />
              </Form.Item>

              <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  max:150,
                  message: 'Avatar must be less than 150 characters!',
                },
            ]}
              >
              <Input />
              </Form.Item>

              <Form.Item
              label="Bio"
              name="bio"
              rules={[
                  {
                  max:150,
                  message: 'Bio must be less than 150 characters!',
                  },
              ]}
              >
              <Input />
              </Form.Item>

              <Form.Item
              label="Fullname"
              name="fullname"
              rules={[
                  {
                  max:40,
                  message: 'fullname must be less than 40 characters!',
                  },
              ]}
              >
              <Input />
              </Form.Item>

              <Form.Item
                name="Private"
                valuePropName="checked"
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Checkbox style={{color:"#FFF"}}>Private</Checkbox>
              </Form.Item>

              <Form.Item
              wrapperCol={{
                  offset:6,
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
