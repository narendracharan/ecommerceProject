const cateSchema = require("../../models/categorySchema/categorySchema");
const subCategorySchema = require("../../models/categorySchema/subCategorySchema");
const subcategory = require("../../models/categorySchema/subCategorySchema");
const subSubCategorySchema = require("../../models/categorySchema/subSubCategorySchema");
const attributeSchema = require("../../models/categorySchema/attributeSchema");
const valueSchema = require("../../models/categorySchema/valuesSchema");
const { success, error } = require("../response");


const createCategory = async (req, res) => {
  try {
    const category = new cateSchema(req.body);
    const filepath = `/${req.file.filename}`;
    category.categoryPic = filepath;
    const saveCategory = await category.save();
    res.status(201).json(success(res.statusCode,"Category Create Successfully",{saveCategory}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

const checkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const updateSubCategoryStatus = await subCategorySchema.findOneAndUpdate(
      { category_Id: id },
      req.body,
      { new: true }
    );
    const updateSubSubCategoryStatus =
      await subSubCategorySchema.findOneAndUpdate(
        { category_Id: id },
        req.body,
        { new: true }
      );
    const updateAttributeStatus = await attributeSchema.findOneAndUpdate(
      { category_Id: id },
      req.body,
      { new: true }
    );
    const updateValuesStatus = await valueSchema.findOneAndUpdate(
      { category_Id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(success(res.statusCode,"Success",{ updateStatus,
      updateSubCategoryStatus,
      updateSubSubCategoryStatus,
      updateAttributeStatus,
      updateValuesStatus,}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

const checkSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subCategoryData = await subcategory.find({ category_Id: id });
    const subSubCategoryData = await subSubCategorySchema.find({
      category_Id: id,
    });
    res.status(200).json(success(res.statusCode,"Success",{subCategoryData,
      subSubCategoryData}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

const categoryList = async (req, res) => {
  try {
    const list = await cateSchema.find({});
    res.status(200).json(success(res.statusCode,"Success",{list}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

const categoryUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode,"Success",{updated}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

const categorySearch = async (req, res) => {
  try {
    const category = req.body.categoryName;
    const categoryData = await cateSchema.find({
      categoryName: { $regex: category, $options: "i" },
    });
    if (categoryData.length > 0) {
     return res.status(200).json(success(res.statusCode,"Success",{categoryData}));
    } else {
      res.status(200).json(error("Data are Not Found",res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

module.exports = {
  createCategory,
  categoryList,
  categoryUpdate,
  categorySearch,
  checkSubCategory,
  checkStatus,
};
