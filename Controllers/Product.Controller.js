const Product = require("../Modal/Product.Modal");
module.exports = {
  getAllProducts: async (req, res) => {
    const allProducts = await Product.find(req.query);
    res.json({ product: allProducts });
  },
  addProduct: async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.json({ product: newProduct });
  },
  getProductByID: async (req, res) => {
    const product = await Product.findById(req.params.productID);
    res.json({ product: product });
  },
  // getProductByBrand: async (req, res) => {
  //   const product = await Product.find({ brand: `${req.params.brand}` }).exec();
  //   res.json({ product: product });
  // },
  updateProductByID: async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.params.productID,
      req.body,
      { new: true }
    );
    res.json({ product: product });
  },
  deleteProductByID: async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.productID);
    res.json({ message: "Deleted" });
  },
};
