import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Button, Input } from "antd";
const { TextArea } = Input;

function Comments(props) {
  // redux useSelector를 이용하여 state.user 정보를 user 변수에 저장
  const user = useSelector((state) => state.user);
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: user.userData._id,
      postId: props.postId,
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        alert("커멘트를 저장하지 못 했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />
      {/* Comment Lists  */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  commentLists={props.commentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comments;
