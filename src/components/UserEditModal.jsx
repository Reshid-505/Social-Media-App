import { Modal, Input, Form, Checkbox, Button } from 'antd';
import { useContext } from 'react';
import { editUser, getAllUsers } from '../services/api/userRequests';
import MainData from '../context/mainContext';
import toast, { Toaster } from 'react-hot-toast';

function UserEditModal() {
    let {user,setUser,isModalOpen,handleCancel,handleOk} = useContext(MainData)
    const onFinish = (values) => {
        getAllUsers()
        .then(datas=>{
            let count=0
            datas.forEach(item=>{
              if(item.username==values.username || item.email==values.email && item.id!=user.id){
                count++
              }
            })
            if(count){
              toast.error("this name or email is already in use ")
            }else{
              console.log(values)
              let data={
                username: values.username,
                password: user.password,
                avatar:values.avatar?values.avatar:"https://pbs.twimg.com/profile_images/1815864260/lorem-ipsum-logo_400x400.jpeg",
                followers: [],
                follows: [],
                requests: [],
                isAdmin: false,
                isVerified: false,
                isPrivite: values.private,
                email: values.eamil,
                posts: [],
                fullname: values.fullname?values.fullname:"",
                bio:values.bio?values.bio:"",
                stories: [],
            }
              editUser(user.id,data).then((data)=>{
                  setUser((data))
                  localStorage.setItem("user",JSON.stringify(data))
                  toast.success("your account is edited")
                  handleCancel()
                })
            }
        })
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <>
      <Modal footer={null} title="Edit User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
              label={<label style={{ color: "#212529" }}>Username</label>}
              name="username"
              rules={[
                  {
                  min:3,
                  message: 'Please input your username!',
                  },
              ]}
              >
              <Input defaultValue={user.username} />
              </Form.Item>

              <Form.Item
              label={<label style={{ color: "#212529" }}>Email</label>}
              name="email"
              rules={[
                  {
                  pattern:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Please input your email!',
                  },
              ]}
              >
              <Input defaultValue={user.email} />
              </Form.Item>
              <Form.Item
              label={<label style={{ color: "#212529" }}>Avatar</label>}
              name="avatar"
              rules={[
                {
                  max:150,
                  message: 'Avatar must be less than 150 characters!',
                },
            ]}
              >
              <Input defaultValue={user.avatar} />
              </Form.Item>

              <Form.Item
              label={<label style={{ color: "#212529" }}>Bio</label>}
              name="bio"
              rules={[
                  {
                  max:150,
                  message: 'Bio must be less than 150 characters!',
                  },
              ]}
              >
              <Input defaultValue={user.bio} />
              </Form.Item>

              <Form.Item
              label={<label style={{ color: "#212529" }}>Fullname</label>}
              name="fullname"
              rules={[
                  {
                  max:40,
                  message: 'fullname must be less than 40 characters!',
                  },
              ]}
              >
              <Input defaultValue={user.fullname} />
              </Form.Item>

              <Form.Item
                name="Private"
                valuePropName="checked"
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Checkbox defaultChecked={user.isPrivite} style={{color:"#212529"}}>Private</Checkbox>
              </Form.Item>

              <Form.Item
              wrapperCol={{
                  offset:6,
                  span: 24,
              }}
              >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
              </Form.Item>
          </Form>
      </Modal>
    </>

  )
}

export default UserEditModal
