import { ConfigProvider, theme, Modal, Input, Form, Button } from 'antd';
import { useContext, useState } from 'react';
import { editUser } from '../services/api/userRequests';
import MainData from '../context/mainContext';
import toast, { Toaster } from 'react-hot-toast';

function UserPasswordEditModal() {
    let {user,setUser,isEditPasswordModalOpen,handleEditPasswordCancel,handleEditPasswordOk} = useContext(MainData)
    const { darkAlgorithm } = theme;
    let [password,setPassword] = useState("")
    const onFinish = (values) => {
        let data={
            username: user.username,
            password: values.password,
            avatar:user.avatar,
            followers: user.followers,
            follows: user.follows,
            requests: user.requests,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            isPrivate: user.isPrivate,
            email: user.email,
            posts: user.posts,
            fullname: user.fullname,
            bio:user.bio,
            stories: user.stories,
        }
        editUser(user.id,data).then((data)=>{
            setUser((data))
            // toast.success("your account is edited")
            handleEditPasswordCancel()
        })
    }
      const onFinishFailed = (errorInfo) => {
        toast.success("Failed!")
        console.log('Failed:', errorInfo);
      };
  return (
    <> 
      <ConfigProvider
      theme={{
        algorithm: darkAlgorithm
      }}>
        <Modal footer={null} title="Change password" open={isEditPasswordModalOpen} onOk={handleEditPasswordOk} onCancel={handleEditPasswordCancel}>
        <div><Toaster/></div>
            <Form
                name="basic"
                labelCol={{
                span: 9,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                margin:"100px 0"
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Current password"
                name="currentPassword"
                rules={[
                    {
                    required:true,
                    message: 'Please input your password!',
                    },
                    {
                    validator:(rule,value)=>value==user.password?Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    message: 'Your password must be same your current password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                label="New password"
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
                label="Confirm new password"
                name="confirmPassword"
                rules={[
                    {
                    required:true,
                    message: 'Please input confirm your password!',
                    },
                    {
                    validator:(rule,value)=>value==password?Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    message: 'Your password must be same!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset:9,
                    span: 16,
                }}
                >
                  <Button type="primary" htmlType="submit">
                      Change
                  </Button>
                </Form.Item>
            </Form>
        </Modal>

      </ConfigProvider>
    </>

  )
}

export default UserPasswordEditModal
