import "./conversation.css";

import { apiUrl } from "../../config.json";
import { useEffect, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
const axios = require("axios").default;

const Conversation = ({ conversation, currentUser, currentChat }) => {
  const [customer, setCustomer] = useState({});
  const [serviceProvider, setServiceProvider] = useState({});

  const [user, setUser] = useState({});
  const [secondParty, setSecondParty] = useState({});
  useEffect(() => {
    const secondPartyId = conversation.members.find(
      (m) => m !== currentUser._id
    );
    if (currentUser.isServiceProvider) {
      getCustomer(secondPartyId);
    } else {
      getServiceProvider(secondPartyId);
    }
  }, [currentUser, conversation]);

  const getCustomer = async (user_id) => {
    try {
      const res = await axios.post(apiUrl + "/customer/get-customer", {
        user_id: user_id,
      });
      setSecondParty(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getServiceProvider = async (user_id) => {
    try {
      const res = await axios.post(apiUrl + "/serviceProvider/" + user_id);

      setSecondParty(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        conversation?._id == currentChat?._id && currentChat != null
          ? "conversation selected"
          : "conversation"
      }
    >
      <Avatar
        style={{
          backgroundColor: "white",
          marginRight: "10px",
          color: "#00235e",
          fontWeight: "bold",
        }}
      >
        {secondParty?.username?.charAt(0)}
      </Avatar>
      <span className="conversationName">{secondParty?.username}</span>
    </div>
  );
};

export default Conversation;
