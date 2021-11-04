const router = require("express").Router();
const Conversation = require("../models/conversation.model");

//Creating new conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getting all conversations for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/isThereConversation/:userId/:receiverId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      $and: [
        { members: { $in: [req.params.userId] } },
        { members: { $in: [req.params.receiverId] } },
      ],
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
