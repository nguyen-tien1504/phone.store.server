const User = require("../Modal/User.Modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mongooseErrorFormatter = (rawErrors) => {
//   const errors = {};
//   const details = rawErrors.errors;
//   for (const key in details) {
//     errors[key] = [details[key].message];
//   }
//   return errors;
// };
module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.find(req.body);
    res.json({ users: users });
  },
  Login: async (req, res) => {
    // console.log(req.body);
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.json("Sai email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.json("Sai mat khau");
      }
      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "1d" }
        );
        const { password, ...rest } = user._doc;
        return res.json({ ...rest, accessToken });
      }
    } catch (error) {
      res.json(error);
    }
  },
  addUser: async (req, res) => {
    // const user = await User.create(req.body);
    // res.json({ user: user });
    try {
      const userEmail = await User.findOne({ email: req.body.email });
      if (userEmail) {
        return res.json("Email đã tồn tại");
      }
      const userUserName = await User.findOne({ userName: req.body.userName });
      if (userUserName) {
        return res.json("User name đã tồn tại");
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = await User.create({ ...req.body, password: hashed });
      res.json("Tạo tài khoản thành công");
    } catch (error) {
      res.json(error);
    }
  },
  updateCart: async (req, res) => {
    const userCart = await User.findByIdAndUpdate(req.params.userID, req.body, {
      new: true,
    });
    res.json({ userCart: userCart });
  },
  getUserByID: async (req, res) => {
    const user = await User.findById(req.params.userID);
    res.json({ user: user });
  },
  getUserandUpdate: async (req, res) => {
    try {
      const user = await User.findById(req.params.userID);
      const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!validPassword) {
        return res.json("Sai mật khẩu");
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.newPassword, salt);
      const newPassword = await User.findByIdAndUpdate(req.params.userID, {
        password: hashed,
      });
      return res.json({ newPassword });
    } catch (error) {
      console.log(error);
    }
  },
};
