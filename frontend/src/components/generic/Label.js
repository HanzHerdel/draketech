import React from "react";
import PropTypes from "prop-types";

const SpanLabel = ({ title = "", ...rest }) => {
  return <label style={{ padding: 4, width: 64 }}>{title}</label>;
};

SpanLabel.propTypes = {
  title: PropTypes.string,
};

export default SpanLabel;
