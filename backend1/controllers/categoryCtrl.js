const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Transaction = require("../models/Transaction");

const categoryController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and type are required for creating a category");
    }
    //Convert the name to lowercase
    const normalizedName = name.toLowerCase();
    //! Check if the type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type" + type);
    }
    //!Check if category already exists on the user
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });
    if (categoryExists) {
      throw new Error(
        `Category ${categoryExists.name} already exists in the database`
      );
    }
    //! Create the category
    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json(category);
  }),

  //!lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),

  //!update
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.id; // ✅ Only get the ID
    const { type, name } = req.body;
  
    if (!type || !name) {
      res.status(400);
      throw new Error("Both 'name' and 'type' are required");
    }
  
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
  
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
  
    if (category.user.toString() !== req.user.toString()) {
      res.status(403);
      throw new Error("User not authorized to update this category");
    }
  
    const oldName = category.name;
  
    // Update category properties
    category.name = name;
    category.type = type;
  
    const updatedCategory = await category.save();
  
    // Update affected transactions if name changed
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        { $set: { category: updatedCategory.name } }
      );
    }
  
    res.json(updatedCategory);
  }),
  


  


  
  //! delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(category && category.user.toString() === req.user.toString()){
      //!  Update transactions that have this category
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {user: req.user, category: category._id},
        {$set: { category: defaultCategory}}
      );
      //! Remove category
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category removed and transactions updated" });
    } else {
      res.json({ message: "Category not found or user not authorized" });
    }
  }),
};

module.exports = categoryController;