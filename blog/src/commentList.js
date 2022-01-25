import React, { useState, useEffect } from "react";

const Commentlist = ({ comments }) => {
  const renderComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.comment}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default Commentlist;
