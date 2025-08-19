const express = require("express");
const {
  getAllProducts,
  addProduct,
  getProductByID,
  updateProductByID,
  deleteProductByID,
} = require("../Controllers/Product.Controller");

// Create a router instance
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProduct);
router.get("/:productID", getProductByID);
router.put("/:productID", updateProductByID);
router.delete("/:productID", deleteProductByID);
module.exports = router;
