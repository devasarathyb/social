import React, { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContextProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () => {
      return makeRequest
        .get("/comments?postId=" + postId)
        .then((res) => res.data);
    },
  });

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleClick = (e) => {
    e.preventDefault();

    mutation.mutate({ desc, postId: postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Type a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
