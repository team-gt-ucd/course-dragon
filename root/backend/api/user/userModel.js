import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
});

const secret = "Encryptthepassword.";
userSchema.plugin(encrypt, { secret:secret, encryptedFields: ["password"]});

var UserItem = mongoose.model('useritem', userSchema);

export default UserItem
