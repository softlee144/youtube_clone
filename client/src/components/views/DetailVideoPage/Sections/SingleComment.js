import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";

const { TextArea } = Input;

function SingleComment() {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment actions={actions} author avatar={<Avatar src alt />} content />

      {/* OpenReply가 true일 때만 form 활성화 */}
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <button style={{ width: "20%", height: "52px" }} onClick>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
