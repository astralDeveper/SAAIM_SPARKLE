const Story = require("./stories.model");
const User = require("../user/user.model");

const GetStories = async (req, res) => {
  try {
    const stories = await Story.find().select(
      "name _id media author title caption "
    );
    return res.status(200).json({ stories, status: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

const GetStoriesByUserId = async (req, res) => {
  try {
    const  userId  = req.body.id; // Assuming `userId` is coming from the request body
    console.log(userId);

    // Query the Story model to find stories with the given user ID
    const stories = await Story.find({ author: userId }).select(
      "name _id media author title caption"
    );

    if (!stories || stories.length === 0) {
      return res
        .status(404)
        .json({ message: "No stories found for this user", status: false });
    }

    return res.status(200).json({ stories, status: true });
  } catch (error) {
    return res.status(500).json({ message: error?.message, status: false });
  }
};


const DeleteStory = async (req, res) => {
  try {
    let { id } = req.params;
    let auth = req.user;
    let story = await Story.findOne({ _id: id, author: auth._id });

    await cloudinary.api.delete_resources([story.media.filename], {
      resource_type: story?.media?.mimetype?.split("/")[0] ?? "video",
      type: "upload",
    });

    await Story.findByIdAndDelete(id);

    let user = await User.findById(auth._id);

    user.stories = user.stories.filter((s) => s._id.toString() !== id);
    await user.save();

    return res.status(200).json({ stories: user.stories, status: true });
  } catch (error) {
    return res.status(500).json({ message: error?.message, status: false });
  }
};
const AddStory = async (req, res) => {
  try {
    const auth = req.body.id;
    const media = req.file;
    const { title, caption } = req.body;

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);
    // const tenMinutesAgo = moment().subtract(2, "minutes").toDate();

    // await Story.deleteMany({ createdAt: { $lt: tenMinutesAgo } });
    if (!auth || !media) {
      return res
        .status(400)
        .json({ message: "Author ID and media are required", status: false });
    }

    const story = await Story.create({
      author: auth,
      media: media.path,
      title: title || "",
      caption: caption || "",
      createdAt: new Date(), // Add creation timestamp
    });

    console.log("Story Created:", story);

    return res.status(200).json({
      message: "Story has been added successfully.",
      status: true,
      stories: story,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message, status: false });
  }
};

module.exports = {
  GetStories,
  GetStoriesByUserId,
  AddStory,
  DeleteStory,
};
