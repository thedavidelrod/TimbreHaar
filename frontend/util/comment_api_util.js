import { $CombinedState } from "redux";

export const fetchComments = () => {
  return $.ajax({
    method: "GET",
    url: "/api/comments",
  })
};

export const createComment = (comment) => {
  return $.ajax({
    method: "POST",
    url: "/api/comments",
    data: { comment },
  })
};

export const deleteComment = (commentId) => {}


