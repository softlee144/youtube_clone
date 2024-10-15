import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import Comments from "./Sections/Comments";

function DetailVideoPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("비디오 정보 가져오기에 실패하였습니다.");
      }
    });

    axios.post("/api/comment/getComments", videoVariable).then((response) => {
      if (response.data.success) {
        console.log("response.data.comments", response.data.comments);
        setCommentLists(response.data.comments);
      } else {
        alert("코멘트 정보 가져오기에 실패하였습니다.");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  if (Video.writer) {
    // 비디오 업로더와 로그인 한 사람이 같을 경우 구독 버튼 표시하지 않기
    const subscribeButton = Video.writer._id !==
      localStorage.getItem("userId") && (
      <Subscriber
        userTo={Video.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    );
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div
            className="postPage"
            style={{ width: "100%", padding: "3rem 4em" }}
          >
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>

            <List.Item
              actions={[subscribeButton]}
              // actions={[
              //   <LikeDislikes
              //     video
              //     videoId={videoId}
              //     userId={localStorage.getItem("userId")}
              //   />,
              //   <Subscriber
              //     userTo={Video.writer._id}
              //     userFrom={localStorage.getItem("userId")}
              //   />,
              // ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="https://ant.design">{Video.title}</a>}
                description={Video.description}
              />
              <div></div>
            </List.Item>

            <Comments
              commentLists={CommentLists}
              postId={videoId}
              refreshFunction={refreshFunction}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DetailVideoPage;
