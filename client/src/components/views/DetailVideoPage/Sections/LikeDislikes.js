import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import axios from "axios";
import { response } from "express";

function LikeDislikes(props) {
  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
      } else {
        alert("Likes 정보를 가져오는 것에 실패하였습니다.");
      }
    });
  }, []);

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like" theme="filled" onClick />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> 1 </span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon type="dislike" theme="filled" onClick />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> 1 </span>
      </span>
    </div>
  );
}

export default LikeDislikes;
