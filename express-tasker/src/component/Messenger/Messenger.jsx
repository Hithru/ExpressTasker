import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import RecipientAbout from "../RecipientAbout/RecipientAbout";
import "./messenger.css";
import auth from "../../services/customerAuth";

import { apiUrl } from "../../config.json";
import { useEffect, useRef, useState } from "react";
import { AnnouncementRounded } from "@material-ui/icons";
import { io } from "socket.io-client";
import PaymentForm from "../PaymentForm/PaymentForm";
const axios = require("axios").default;

const Messenger = () => {
  const user = auth.getCurrentUser();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef(io("ws://localhost:8900"));
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    getConversations();
  }, [user._id]);

  const getConversations = async () => {
    try {
      const res = await axios.get(apiUrl + "/conversations/" + user._id);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const getMessages = async () => {
    try {
      const res = await axios.get(apiUrl + "/messages/" + currentChat?._id);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(apiUrl + "/messages", message);
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
    setNewMessage("");
  };

  const handlePaymentRequest = () => {};

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //////////////////////////////////////////////////UI related //////////////////////////////////////////

  const renderNoConversation = () => {
    return (
      <div className="noConversationWrapper">
        <div className="noConversation">
          <AnnouncementRounded
            style={{ fontSize: 110, color: "gray" }}
          ></AnnouncementRounded>
          <div className="noConversationText">
            Please Select A Conversation !
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {" "}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatListTopic">Chat List</div>
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <div
                onClick={() => {
                  setCurrentChat(c);
                }}
              >
                <Conversation
                  conversation={c}
                  currentUser={user}
                  currentChat={currentChat}
                />
                {console.log(currentChat)}
              </div>
            ))}
          </div>
          <hr></hr>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        currentUser={user}
                        message={m}
                        own={m.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                  ></textarea>

                  <div className="chatSubmitButtonWrapper">
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              renderNoConversation()
            )}
          </div>
        </div>
        <div className="aboutRecipient">
          <div className="aboutRecipientWrapper">
            <RecipientAbout
              isRecipientServiceProvider={!user.isServiceProvider}
              conversation={currentChat}
              currentUser={user}
            />
          </div>
          <div className="paymentFormWrapper">
            {!user.isRecipientServiceProvider ? (
              <PaymentForm
                isRecipientServiceProvider={!user.isServiceProvider}
                conversation={currentChat}
                currentUser={user}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="additionalBar"></div>
    </div>
  );
};

export default Messenger;
