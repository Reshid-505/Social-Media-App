import {PropTypes} from "prop-types"
import { useContext, useState } from "react"
import MainData from "../context/mainContext"
import { HeartOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons';
function PostPreview({postData}) {
    let {user} = useContext(MainData)
    let [isLiked,setIsliked] = useState(false)
  return (

    <>
      <div className="post preview-post">
        <div className="post-header">
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}><img src={user?.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid #FCB010"}} />{user.username}</div>
        </div>
        <div className="post-image">
            <img src={postData.image} alt=""/>
        </div>
        <div className="post-footer">
            <div className="buttons">
              {isLiked?
              <HeartFilled onClick={()=>{setIsliked(!isLiked)}} style={{color:"#F31212"}} />:
              <HeartOutlined onClick={()=>{setIsliked(!isLiked)}} style={{color:"#F31212"}} />
              }
              <CommentOutlined />
            </div>
            <div className="desc">
            <p><b>{user.username}:</b> {postData.description}</p>
            </div>
        </div>
      </div>
    </>
  )
}
PostPreview.propTypes={
    postData:PropTypes.object
}
export default PostPreview
