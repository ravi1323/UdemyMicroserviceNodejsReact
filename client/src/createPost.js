import React, { useState } from "react";
import axios from "axios";

const Createpost = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title,
    });
    setTitle("");
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='content'>Post</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            className='form-control'
            id='content'
          />
        </div>
        <button className='btn btn-primary mt-2 w-100'>Submit</button>
      </form>
    </div>
  );
};

export default Createpost;
