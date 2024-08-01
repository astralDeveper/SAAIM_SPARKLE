const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
  {
    friendlist: [
      {
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
      },
    ],
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Friend', friendSchema);
