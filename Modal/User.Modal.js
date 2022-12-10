const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  admin: { type: Boolean, default: false },
  order: {
    cart: [
      {
        title: { type: String },
        price: { type: Number },
        thumbnail: { type: String },
        quantity: { type: Number },
      },
    ],
    totalBill: { type: Number },
    addressDelivery: { type: String },
    orderAt: { type: Date, required: true, default: new Date() },
  },
});
// userSchema.path("email").validate(async (email) => {
//   const emailCount = await mongoose.models.User.countDocuments({
//     email,
//   });
//   return !emailCount;
// }, "Email alredy exist");
// userSchema.path("userName").validate(async (userName) => {
//   const userNameCount = await mongoose.models.User.countDocuments({
//     userName,
//   });
//   return !userNameCount;
// }, "User alredy exist");
const User = mongoose.model("User", userSchema);
module.exports = User;
