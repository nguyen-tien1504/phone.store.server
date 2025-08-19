const express = require("express");
const { getAllCategories, addCategory, findCategoryByID, updateCategory, deleteCategory } = require("../Controllers/Category.Controller");

const router = express.Router();
router.get("/", getAllCategories);
router.post("/", addCategory);
router.get("/:categoryID", findCategoryByID);
router.put("/:categoryID", updateCategory);
router.delete("/:categoryID", deleteCategory);
module.exports = router;
