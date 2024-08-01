const mongoose = require("mongoose");

const appUpdate = new mongoose.Schema(
  {
    URL: String,
    dis: { type: String, default: "" },
    ison:{type:Boolean,default:false}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("AppUpdate", appUpdate);
