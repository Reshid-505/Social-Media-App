import { ConfigProvider, theme, Modal, Input, Form, Checkbox, Button } from 'antd';
import { useContext } from 'react';
import { editUser, getAllUsers } from '../services/api/userRequests';
import MainData from '../context/mainContext';
import toast, { Toaster } from 'react-hot-toast';

function UserEditModal() {
    let {user,setUser,isEditUserModalOpen,handleEditCancel,handleEditOk} = useContext(MainData)
    const { darkAlgorithm } = theme;
    const onFinish = (values) => {
        getAllUsers()
        .then(datas=>{
            let count=0
            datas.forEach(item=>{
              if((item.username==values.username || item.email==values.email) && item.id!=user.id){
                count++
              }
            })
            if(count){
              toast.error("this name or email is already in use ")
            }else{
              let data={
                username: values.username,
                password: user.password,
                avatar:values.avatar?values.avatar:"https://pbs.twimg.com/profile_images/1815864260/lorem-ipsum-logo_400x400.jpeg",
                followers: user.followers,
                follows: user.follows,
                requests: user.requests,
                isAdmin: user.isAdmin,
                isVerified: user.isVerified,
                isPrivate: values.private,
                email: values.email,
                posts: user.posts,
                fullname: values.fullname?values.fullname:"",
                bio:values.bio?values.bio:"",
                blocks: user.blocks,
            }
              editUser(user.id,data).then((data)=>{
                  setUser((data))
                  // toast.success("your account is edited")
                  handleEditCancel()
                })
            }
        })
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <> 
      <ConfigProvider
      theme={{
        algorithm: darkAlgorithm
      }}>
        <Modal footer={null} title="Edit User" open={isEditUserModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
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
                username:user?.username,
                email:user?.email,
                avatar:user?.avatar,
                fullname:user?.fullname,
                bio:user?.bio,
                private:user?.isPrivate,
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
                    message: 'Fullname must be less than 40 characters!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                  name="private"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 6,
                    span: 16,
                  }}
                >
                  <Checkbox defaultChecked={user.isPrivate}>Private</Checkbox>
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset:6,
                    span: 24,
                }}
                >
                  <Button type="primary" htmlType="submit">
                      Edit
                  </Button>
                </Form.Item>
            </Form>
        </Modal>

      </ConfigProvider>
    </>

  )
}

export default UserEditModal
