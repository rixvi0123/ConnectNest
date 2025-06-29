const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username"],
    },

    email: {
      type: String,
      required: [true, "Please add user email address"],
      unique: [true, "email Already exist"],
    },

    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
     resetHint: String,      // e.g., “My fav animal”
  resetKeyHash: String, 
  },
  {
     timestamps: true,
  }
);
module.exports=mongoose.model("User",userSchema);
