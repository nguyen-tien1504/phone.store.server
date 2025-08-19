const Category = require("../Modal/Category.Modal");
module.exports = {
  getAllCategories: async (req, res) => {
    const categories = await Category.find(req.query);
    res.json({ categories: categories });
  },
  addCategory: async (req, res) => {
    const newCategory = await Category.create(req.body);
    res.json({ category: newCategory });
  },
  findCategoryByID: async (req, res) => {
    const category = await Category.findById(req.params.categoryID);
    res.json({ category: category });
  },
  updateCategory: async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryID,
      req.body,
      { new: true }
    );
    res.json({ category: updatedCategory });
  },
  deleteCategory: async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.categoryID);
    res.json({ category: deletedCategory });
  },
};
