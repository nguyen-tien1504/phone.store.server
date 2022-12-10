const express = require("express");
const MiddleWarse = require("../Controllers/MiddleWarse.Controller");
const {
  Login,
  addUser,
  updateCart,
  getUserByID,
  getAllUsers,
  getUserandUpdate,
} = require("../Controllers/User.Controller");

const router = express.Router();
// router.get("/", MiddleWarse.verifyToken, getAllUsers);
router.get("/", getAllUsers);

router.post("/login", Login);
router.get("/:userID", getUserByID);
router.post("/signin", addUser);
router.put("/:userID", updateCart);
router.put("/updateUser/:userID", getUserandUpdate);
module.exports = router;
