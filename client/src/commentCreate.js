import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      comment,
    });
    setComment("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='comment'>New comment</label>
          <input
            type='text'
            name='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-success'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
