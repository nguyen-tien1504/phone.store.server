const Category = require("../Modal/Category.Modal");
const Product = require("../Modal/Product.Modal");
module.exports = {
  getAllProducts: async (req, res) => {
    const { brand } = req.query;
    if (brand) {
      const { _id } = await Category.findOne({ name: brand }).select("_id");
      const allProducts = await Product.find({ brand: _id })
        .populate("brand")
        .select("-specifications");
      res.json({ product: allProducts });
    } else {
      const allProducts = await Product.find()
        .populate("brand")
        .select("-specifications");
      res.json({ product: allProducts });
    }
  },
  addProduct: async (req, res) => {
    const product = { ...req.body };
    product.brand = await Category.findById(product.brand);
    const newProduct = await Product.create(product);
    res.json({ product: newProduct });
  },
  getProductByID: async (req, res) => {
    const product = await Product.findById(req.params.productID);
    res.json({ product: product });
  },
  updateProductByID: async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.productID, req.body, {
      new: true,
    });
    res.json({ product: product });
  },
  deleteProductByID: async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.productID);
    res.json({ message: "Deleted" });
  },
};
