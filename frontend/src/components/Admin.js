import { Fragment } from "react";
import PostsCard from "./generic/PostCard";

function Admin({ posts = [], ...props }) {
  return (
    <Fragment>
      {posts.map((p) => (
        <PostsCard onlyHead key={p._id} post={p} admin />
      ))}
    </Fragment>
  );
}

export default Admin;
