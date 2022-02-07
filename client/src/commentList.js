import React, { useState, useEffect } from "react";

const Commentlist = ({ comments }) => {
  const renderComments = comments.map((comment) => {
    let content;
    switch (comment.status) {
      case "approved":
        content = comment.comment;
        break;
      case "rejected":
        content = "This comment has been rejected.";
        break;
      case "pending":
        content = "This comment is awaiting moderating.";
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default Commentlist;
