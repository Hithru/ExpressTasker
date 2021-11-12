import "./message.css";
import { format } from "timeago.js";
import { apiUrl } from "../../config.json";
import { useEffect, useRef, useState } from "react";
const axios = require("axios").default;
const Message = ({ message, own, currentUser }) => {
  const [senderName, setSenderName] = useState();
  useEffect(() => {
    if (own) {
      setSenderName(currentUser.username);
    } else {
      if (currentUser.isServiceProvider) {
        getCustomer(message.sender);
      } else {
        getServiceProvider(message.sender);
      }
    }
  }, [currentUser]);

  const getCustomer = async (user_id) => {
    try {
      const res = await axios.post(apiUrl + "/customer/get-customer", {
        user_id: user_id,
      });
      setSenderName(res.data.username);
    } catch (err) {
      console.log(err);
    }
  };
  const getServiceProvider = async (user_id) => {
    try {
      const res = await axios.post(apiUrl + "/serviceProvider/" + user_id);
      setSenderName(res.data.username);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {senderName}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
