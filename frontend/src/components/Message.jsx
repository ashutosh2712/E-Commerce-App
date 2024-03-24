import React from "react";

const Message = ({ className, children }) => {
  return <div className={`messageContainer ${className}`}>{children}</div>;
};

export default Message;
