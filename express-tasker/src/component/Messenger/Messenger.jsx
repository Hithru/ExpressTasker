import Conversations from "../Conversations/Conversations";
import Message from "../Message/Message";
import "./messenger.css";

const Messenger = () => {
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <Conversations />
          <Conversations />
          <Conversations />
          <Conversations />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message own={true} />
            <Message own={true} />
            <Message own={true} />
            <Message own={true} />
          </div>
          <div className="chatBoxBottom"></div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
