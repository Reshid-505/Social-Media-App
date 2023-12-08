import {PropTypes} from "prop-types"
import { useContext } from "react"
import MainData from "../context/mainContext"
function Post({postData}) {
    let {user} = useContext(MainData)
  return (

    <>
      <div className="post">
        <div className="post-header">
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}><img src={user?.avatar} alt="avatar" style={{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid #FCB010"}} />{user.username}</div>
        </div>
        <div className="post-image">
            <img src={postData.image} alt=""/>
        </div>
        <div className="post-footer">
            <p><b>{user.username}:</b> {postData.description}</p>
        </div>
      </div>
    </>
  )
}
Post.propTypes={
    postData:PropTypes.object
}
export default Post
