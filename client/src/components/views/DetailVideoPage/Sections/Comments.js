import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
        //setComment("")
        //props.refreshFunction(response.data.result)
      } else {
        alert("커멘트를 저장하지 못 했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p> replies</p>
      <hr />
      {/* Comment Lists  */}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textArea
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
