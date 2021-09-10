import { Fragment, useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../../utils/constants";

import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { API_SERVICES } from "../../utils/services";
import { deletePost } from "../../utils/api";

/**STYLES */
const postStyle = {
  display: "flex",
  maxWidth: 800,
  flexWrap: "wrap",
  margin: "16px auto",
  background: "darkgray",
  padding: 16,
};
const dateStyle = {
  position: "absolute",
  marginTop: -8,
};

const PostsCard = ({ post, onlyHead, admin, ...rest }) => {
  /**HOOKS */
  const [category] = useState(
    CATEGORIES.find((c) => c.value === post.category)
  );
  const spanRef = useRef(null);
  const history = useHistory();
  /**EFFECTS */
  /** format markdown if needed */
  useEffect(() => {
    async function formatContent() {
      const snarkdown = (await import("snarkdown")).default;
      const contentMarkDown = snarkdown(post.content);
      spanRef.current.innerHTML = contentMarkDown;
    }
    if (!onlyHead && spanRef.current) formatContent();
  }, [post.content, onlyHead]);

  /**FUNCTIONS */
  const goSingleView = () => {
    const formatedTitle = post.title.replace(/\s/g, "-").toLowerCase();
    history.push(`${post.category}/${formatedTitle}/${post._id}`);
  };

  const goEdition = () => {
    history.push(`post/${post._id}`);
  };
  const hanldeDelete = async () => {
    await deletePost(API_SERVICES.put.replace(":id", post._id));
    window.location.reload();
  };
  return (
    <div style={postStyle}>
      <span style={dateStyle}>{post.parsedDate.toDateString()}</span>
      <div style={{ width: "100%" }}>
        <h1>Title: {post.title || "None"}</h1>
        <h3 style={{ marginTop: -24 }}>Category: {category.title || "None"}</h3>
      </div>
      {onlyHead ? (
        <button onClick={goSingleView}>See Post</button>
      ) : (
        <div>
          <span ref={spanRef} />
        </div>
      )}
      {admin && (
        <Fragment>
          <button onClick={goEdition}>Edit</button>
          <button onClick={hanldeDelete}>Delete</button>
        </Fragment>
      )}
    </div>
  );
};

PostsCard.propTypes = {
  options: PropTypes.object,
  onlyHead: PropTypes.bool,
  admin: PropTypes.bool,
};
export default PostsCard;
