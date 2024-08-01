const Friend = require('./friend.modal');
const User = require('../user/user.model');

// Add Friend
exports.addFriend = async (req, res) => {
  console.log(req.body);
  try {
    const { userId, friendId } = req.body;

    // Validate users
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the friend document of the user
    let friendDoc = await Friend.findOne({ userid: userId });
    if (!friendDoc) {
      // If no friend document exists, create a new one
      friendDoc = new Friend({ userid: userId, friendlist: [] });
    }

    // Check if the friend is already in the friend list
    if (!friendDoc.friendlist.some(f => f.friendId.equals(friendId))) {
      friendDoc.friendlist.push({ friendId, status: 'accepted' });
      await friendDoc.save();
    }

    res.status(200).json({ message: 'Friend added successfully', friendlist: friendDoc.friendlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding friend', error });
  }
};

// Delete Friend
exports.deleteFriend = async (req, res) => {
  console.log(req.body);
  try {
    const { userId, friendId } = req.body;

    // Validate users
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the friend document of the user
    const friendDoc = await Friend.findOne({ userid: userId });
    if (friendDoc) {
      // Remove the friendId from the friendlist array
      friendDoc.friendlist = friendDoc.friendlist.filter(f => !f.friendId.equals(friendId));
      await friendDoc.save();
    }

    res.status(200).json({ message: 'Friend deleted successfully', friendlist: friendDoc.friendlist });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting friend', error });
  }
};

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
  console.log(req.body);
  try {
    const { userId, friendId } = req.body;

    // Validate users
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the friend document of the user
    let friendDoc = await Friend.findOne({ userid: userId });
    if (!friendDoc) {
      // If no friend document exists, create a new one
      friendDoc = new Friend({ userid: userId, friendlist: [] });
    }

    // Check if the friend request already exists
    if (!friendDoc.friendlist.some(f => f.friendId.equals(friendId))) {
      friendDoc.friendlist.push({ friendId, status: 'pending' });
      await friendDoc.save();
    }

    res.status(200).json({ message: 'Friend request sent', friendlist: friendDoc.friendlist });
  } catch (error) {
    res.status(500).json({ message: 'Error sending friend request', error });
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Validate users
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the friend document of the user
    let friendDoc = await Friend.findOne({ userid: userId });
    if (!friendDoc) {
      // If no friend document exists, create a new one
      friendDoc = new Friend({ userid: userId, friendlist: [] });
    }

    // Find the friend request
    const friendRequest = friendDoc.friendlist.find(f => f.friendId.equals(friendId));
    if (friendRequest) {
      friendRequest.status = 'accepted';
      await friendDoc.save();
    }

    res.status(200).json({ message: 'Friend request accepted', friendlist: friendDoc.friendlist });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting friend request', error });
  }
};

// Get All Friends
exports.getAllFriends = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user
    console.log("friendDoc");
    return
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the friend document of the user
    const friendDoc = await Friend.findOne({ userid: userId }); // Adjust the populate fields as needed
    if (!friendDoc) {
      return res.status(404).json({ message: 'No friends found' });
    }

    res.status(200).json({ friendlist: friendDoc.friendlist });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friends', error });
  }
};


exports.getIncomingFriendRequests = async (req, res) => {
 
  try {
    const { id } = req.params;
    console.log("Received user ID:", id);

    // Validate user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    console.log("User found:", user);

    // Find the friend document of the user
    const friendDoc = await Friend.findOne({ userid: id });
    if (!friendDoc) {
      return res.status(404).json({ status: false, message: 'No friend requests found' });
    }
    console.log("Friend document found:", friendDoc);

    // Filter to get only pending requests where the user is the recipient
    const incomingRequests = friendDoc.friendlist.filter(f => f.status === 'pending');
    console.log("Incoming requests:", incomingRequests);

    console.log("User found:", user);
    res.status(200).json({ status: true, incomingRequests ,user });
  } catch (error) {
    console.error("Error fetching incoming friend requests:", error);
    res.status(500).json({ status: false, message: 'Error fetching incoming friend requests', error: error.message });
  }
};

// module.exports = {
//   addFriend,
//   deleteFriend,
//   sendFriendRequest,
//   acceptFriendRequest,
//   getAllFriends,
//   // getIncomingFriendRequests
// };
