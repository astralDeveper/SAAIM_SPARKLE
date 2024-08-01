const User = require("../user/user.model");

const getSuggestions = async (req, res) => {
  try {
    const { _id, gender } = req.params;
    console.log(req.params);
    // Determine gender filter based on the specified gender
    let genderFilter = {};
    if (gender === "male") {
      genderFilter.gender = "male";
    } else if (gender === "female") {
      genderFilter.gender = "female";
    } else if (gender === "mix") {
      genderFilter.gender = { $in: ["male", "female"] };
    } else {
      return res
        .status(400)
        .json({ msg: "Invalid gender specified", status: false });
    }

    // Find users based on gender filter and excluding the current user
    const users = await User.find({
      _id: { $ne: _id },
      ...genderFilter,
    }).select(["name", "_id", "image", "gender", "type"]);

    // If users found, return them
    if (users.length > 0) {
      return res.status(200).json({ users, status: true });
    } else {
      return res
        .status(200)
        .json({ users: [], msg: "No users found", status: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error?.message, status: false });
  }
};

module.exports = { getSuggestions };
