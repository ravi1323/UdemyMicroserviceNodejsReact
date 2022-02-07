import axios from "axios";
import React, { useState, useEffect } from "react";
import CommentCreate from "./commentCreate";
import Commentlist from "./commentList";

const Postlist = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  const renderPosts = Object.values(posts)
    .slice(0)
    .reverse()
    .map((post) => {
      return (
        <div className='card m-l-4' key={post.id} style={{ width: "18rem" }}>
          <div className='card-body'>
            <div className='card-title'>{post.id}</div>
            <h4>{post.title}</h4>
            <Commentlist comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      );
    });

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='d-flex flex-row d-md-flex justify-content-between'>
      {renderPosts}
    </div>
  );
};

export default Postlist;
