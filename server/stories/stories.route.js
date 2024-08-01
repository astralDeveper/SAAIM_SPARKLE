const express = require("express");
const router = express.Router();
const { GetStories, GetStoryById, DeleteStory, AddStory, GetStoriesByUserId } = require("./stories.controller")
const { ProfileImageUploader, StorieUploader } = require("../../util/fileUploder")
const multer = require("multer");
const checkAccessWithKey = require("../../checkAccess");

// story routes 
// router.post("/add-story",  StorieUploader, AddStory);
router.post("/add-story", StorieUploader, AddStory);
router.get("/get-stories",  GetStories);
router.post("/get-story-with", GetStoriesByUserId);
// route.get("/get-story", verifyToken, GetStoryWithoutId);
router.delete("/delete-story/:id", checkAccessWithKey(), DeleteStory);

module.exports = router;