import { Row, Col, Input, Form, Button } from "antd"
import Post from "../../components/Post"
import { useContext, useState } from "react"
import MainData from "../../context/mainContext"
import { editUser } from "../../services/api/userRequests"
import { useNavigate } from "react-router-dom"

function AddPost() {
    let {user,setUser} = useContext(MainData)
    let navigate = useNavigate()
    let [photo,setPhoto] = useState("")
    let [desc,setDesc] = useState("")
    let postData={
        "image": photo,
        "description": desc,
        "isLiked":false
    }
    const onFinish = () => {
        let date = new Date()
        let data={
            username: user.username,
            password: user.password,
            avatar:user.avatar,
            followers: user.followers,
            follows: user.follows,
            requests: user.requests,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            isPrivate: user.isPrivate,
            email: user.email,
            posts: [...user.posts,
                {
                    "id": String(user.posts.length+1),
                    "userId": user.id,
                    "createdAt": date.getTime(),
                    "image": photo,
                    "description": desc,
                    "likes": [],
                    "comments": []
                  },],
            fullname: user.fullname,
            bio:user.bio,
            stories: user.stories,
        }
        editUser(user.id,data).then((data)=>{
            setUser(data)
            navigate("/")
        })
        
    }
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <>
        <Row>
            <Col span={12}>
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
                label="Photo"
                name="photo"
                rules={[
                    {
                    required:true,
                    message: 'Please input your photo url!',
                    },
                ]}
                >
                <Input value={photo} onChange={(e)=>{setPhoto(e.target.value)}}  />
                </Form.Item>

                <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                    required:true,
                    message: 'Please input your photo url!',
                    },
                ]}
                >
                <Input value={desc} onChange={(e)=>{setDesc(e.target.value)}}  />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset:9,
                    span: 16,
                }}
                >
                  <Button type="primary" htmlType="submit">
                      Add
                  </Button>
                </Form.Item>
            </Form>
            </Col>
            <Col style={{display:"flex",alignItems:"center",justifyContent:"center"}} span={12}>
                <Post postData={postData} />
            </Col>
        </Row> 
    </>
  )
}

export default AddPost
