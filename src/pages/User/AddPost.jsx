import { Row, Col } from "antd"
import Post from "../../components/Post"

function AddPost() {
    let postData={
        "image": "https://cdn.vox-cdn.com/thumbor/L5VZerSy9xNTld2m4cDFvGmUCEI=/0x0:3840x2160/1200x800/filters:focal(1613x773:2227x1387)/cdn.vox-cdn.com/uploads/chorus_image/image/72844677/Watch_Trailer_1__Tuesday__December_5_at_9AM_ET_1_24_screenshot.6.jpg",
        "description": "GTA6 Logo",
    }
  return (
    <>
        <Row>
            <Col span={12}>
                
            </Col>
            <Col style={{display:"flex",alignItems:"center",justifyContent:"center"}} span={12}>
                <Post postData={postData} />
            </Col>
        </Row> 
    </>
  )
}

export default AddPost
