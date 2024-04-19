import React from "react";
import "./feeds.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Feeds = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      if (userId) {
        return makeRequest
          .get("/posts?userId=" + userId)
          .then((res) => res.data);
      }
      return makeRequest.get("/posts").then((res) => res.data);
    },
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Feeds;
