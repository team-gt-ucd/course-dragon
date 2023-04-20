import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
});


var UserItem = mongoose.model('useritem', userSchema);

export default UserItem
