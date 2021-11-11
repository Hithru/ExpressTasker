import { useRef, useEffect, useState } from "react";
import "./RecipientAbout.css";
import { apiUrl } from "../../config.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
const axios = require("axios").default;

const RecipientAbout = ({
  isRecipientServiceProvider,
  conversation,
  currentUser,
}) => {
  const [recipient, setRecipient] = useState(null);
  useEffect(() => {
    const secondPartyId = conversation?.members.find(
      (m) => m !== currentUser._id
    );
    if (isRecipientServiceProvider) {
      getServiceProvider(secondPartyId);
    } else {
      getCustomer(secondPartyId);
    }
  }, [conversation]);

  const getCustomer = async (user_id) => {
    try {
      const res = await axios.post(apiUrl + "/customer/get-customer", {
        user_id: user_id,
      });
      setRecipient(res.data);
      if (typeof res.data != "object") {
        setRecipient(null);
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getServiceProvider = async (user_id) => {
    try {
      const res = await axios.post(apiUrl + "/serviceProvider/" + user_id);
      console.log(res);
      setRecipient(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////////////////////////////////////////UI related///////////////////////////////////////////////////////////////

  const renderServiceProviderCard = (recipient) => {
    return (
      <div>
        <div className="cardUserName">{recipient?.username}</div>
        <div className="cardLocation">{recipient?.location}</div>
        <hr className="horizontalLine"></hr>
        <div className="contactSection">
          <div>Phone: {recipient?.contactNumber}</div>
          <div>Email: {recipient?.email}</div>
        </div>
        <hr className="horizontalLine"></hr>
        <div className="ratingSection">
          <div className="cardRating">{recipient?.rating}</div>
          <Rating
            name="half-rating-read"
            precision={0.1}
            value={recipient != null ? recipient.rating : 0}
            readOnly
          />
        </div>
        <hr className="horizontalLine"></hr>
        <div className="skillsSection">
          {recipient?.skills.map(renderSkillChips)}
        </div>
      </div>
    );
  };

  const renderCustomerCard = (recipient) => {
    return (
      <div>
        <div className="cardUserName">{recipient?.username}</div>
        <div className="cardLocation">{recipient?.location}</div>
        <div className="ratingSection">
          <div className="cardRating">{recipient?.rating}</div>
          <Rating
            name="half-rating-read"
            precision={0.1}
            value={recipient != null ? recipient.rating : 0}
            readOnly
          />
        </div>
      </div>
    );
  };

  const renderSkillChips = (skill) => {
    return (
      <Chip
        icon={<DoneIcon />}
        label={skill}
        clickable="false"
        color="primary"
        variableWidth={true}
        deleteIcon={<DoneIcon />}
        style={{
          margin: "5px",
          backgroundColor: "#f28f00",
          color: "#00235e",
          fontWeight: "bold",
        }}
        size="large"
      />
    );
  };

  return (
    <div>
      <div className="recipientInfoTopic">
        {conversation != null ? "Recipient Info" : ""}
      </div>
      {recipient == null && conversation != null ? <CircularProgress /> : ""}
      {console.log(recipient)}
      {recipient != null ? (
        <div className="infoCard">
          {isRecipientServiceProvider
            ? renderServiceProviderCard(recipient)
            : renderCustomerCard(recipient)}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RecipientAbout;
