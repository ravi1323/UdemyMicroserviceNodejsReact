import React from "react";
import Createpost from "./createPost";
import Postlist from "./postList";

const App = () => {
  return (
    <div className='app container'>
      <h1>Create Posts</h1>
      <Createpost />
      <hr />
      <h3 className='text-center'>POSTS</h3>
      <Postlist />
    </div>
  );
};

export default App;
