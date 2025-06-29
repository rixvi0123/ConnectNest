const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add contact name"],
    },

    email: {
      type: String,
      required: [true, "Please add contact email address"],
    },

    phone: {
      type: String,
      required: [true, "Please add contact phone number"],
    },
    tag: {
      type: String,
      enum: ["Friends", "Family", "Work", "Other"],
      default: "Other",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Contact", contactSchema);
