import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useParams } from "react-router";
import PostsCard from "./generic/PostCard";

const SingleView = ({ isFetching, posts, ...props }) => {
  const [post, setpost] = useState(null);

  const params = useParams();
  /**EFFECTS */
  useEffect(() => {
    if (!posts?.length) return;
    const singlePost = posts.find((p) => {
      return p._id === params.id;
    });
    setpost(singlePost);
  }, [posts, params]);

  return post ? <PostsCard post={post} /> : "Loading...";
};

SingleView.propTypes = {
  posts: PropTypes.array,
  isFetching: PropTypes.bool,
};

export default SingleView;
