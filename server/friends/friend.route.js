const express = require("express");
const router = express.Router();

const FriendController = require("./frineds.controller");
const checkAccessWithKey = require("../../checkAccess");

// Apply access key check middleware (uncomment if needed)
// router.use(checkAccessWithKey());

// Get all friends by user ID
router.get("/get-all-friends/:userId", FriendController.getAllFriends);

// Add a friend
router.post("/add", FriendController.addFriend);

// Delete a friend
router.delete("/delete-friend", FriendController.deleteFriend);

// Send a friend request
router.post("/send-request", FriendController.sendFriendRequest);

// Accept a friend request
router.post("/accept-request", FriendController.acceptFriendRequest);
// get request
router.get(
  "/incoming-friend-requests/:id",
  FriendController.getIncomingFriendRequests
);

module.exports = router;
