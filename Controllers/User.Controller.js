const User = require("../Modal/User.Modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllUsers: async (req, res) => {
    if (req.query?.cart == "all") {
      const users = await User.find().select("fullName phone order");
      // Optionally, calculate totalBill for each user
      for (const user of users) {
        user.order.totalBill = user.calculateTotalBill();
      }
      return res.json({ users });
    } else if (req.query?.cart) {
      const user = await User.findById(req.query.cart).select("fullName phone order");
      user.order.totalBill = user.calculateTotalBill();
      return res.json({ user });
    }
    const users = await User.find(req.body);
    return res.json({ users: users });
  },
  Login: async (req, res) => {
    // console.log(req.body);
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.json("Sai email");
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.json("Sai mat khau");
      }
      if (user && validPassword) {
        const { password, ...rest } = user._doc;

        return res.json({ ...rest });
      }
    } catch (error) {
      res.json(error);
    }
  },
  addUser: async (req, res) => {
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
    if (req.query?.status) {
      const user = await User.findByIdAndUpdate(
        req.params.userID,
        { $set: { "order.status": req.query.status } },
        { new: true }
      );
      return res.json({ user });
    }
    const userCart = await User.findByIdAndUpdate(req.params.userID, req.body, {
      new: true,
    });
    return res.json({ userCart: userCart });
  },
  getUserByID: async (req, res) => {
    if (req.query?.cart) {
      const user = await User.findById(req.params.userID).select("order fullName phone");
      user.order.totalBill = await user.calculateTotalBill();
      return res.json(user);
    }
    const user = await User.findById(req.params.userID).select("-order");
    res.json({ user });
  },
  getUserandUpdate: async (req, res) => {
    try {
      if (req.body.oldPassword && req.body.newPassword) {
        const user = await User.findById(req.params.userID);
        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!validPassword) {
          return res.json("Sai mật khẩu");
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.newPassword, salt);
        await User.findByIdAndUpdate(req.params.userID, {
          password: hashed,
        });
        return res.json("Cập nhật mật khẩu thành công");
      }
      const user = await User.findByIdAndUpdate(req.params.userID, req.body);
      return res.json("Cập nhật thông tin thành công");
    } catch (error) {
      console.log(error);
    }
  },
};
