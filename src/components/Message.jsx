import React from "react";

const Message = ({ children }) => {
  return <div className="messageContainer">*{children}</div>;
};

export default Message;
