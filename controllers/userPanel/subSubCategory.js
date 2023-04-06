const cateSchema = require("../../models/userSchema/subSubCategorySchema");
const category = require("../../models/userSchema/categorySchema");
const subCategory = require("../../models/userSchema/subCategorySchema");
const Attribute = require("../../models/userSchema/attributeSchema");
const values = require("../../models/userSchema/valuesSchema");

const subSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subSubCategory = new cateSchema(req.body);
    const cate = await cateSchema.findOne({ category_Id: id });
    const createSubSubCategory = await subSubCategory.save();
    if (cate.status == true) {
      res.status(200).json({
        error: false,
        error_code: 200,
        message: "Success",
        results: {
          createSubSubCategory,
        },
      });
    } else if (cate.status == false) {
      res.status(400).json({
        error: true,
        error_code: 400,
        message: "Permission not allowed",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: true,
      error_code: 400,
      message: Error,
    });
  }
};

const checkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Success",
      updateStatus,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: err.message,
    });
  }
};

const checkAttribute = async (req, res) => {
  try {
    const id = req.params.id;
    const checkData = await Attribute.find({ subSubCategory_Id: id });
    const valuesData = await values.find({ subSubCategory_Id: id });
    res.status(200).json({
      error: false,
      error_code: 200,
      message: "Success",
      results: {
        checkData,
        valuesData,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: Error,
    });
  }
};

const selectCategory = async (req, res) => {
  try {
    const categoryData = await category.find();
    res.status(200).json({
      error: false,
      error_code: 200,
      message: "Success",
      results: {
        categoryData,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: Error,
    });
  }
};

const selectSubCategory = async (req, res) => {
  try {
    const subCategoryData = await subCategory.find();
    res.status(200).json({
      error: false,
      error_code: 200,
      message: "Success",
      results: {
        subCategoryData,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: Error,
    });
  }
};

const subSubCategoryList = async (req, res) => {
  try {
    const list = await cateSchema.find({});
    res.status(200).json({
      error: false,
      error_code: 200,
      message: "Success",
      results: {
        list,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: Error,
    });
  }
};

const subSubCategoryUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      error: false,
      error_code: 200,
      message: "Success",
      results: {
        update,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: Error,
    });
  }
};

const subSubCategorySearch = async (req, res) => {
  try {
    const subSubCategory = req.body.subSubCategoryName;
    const categoryData = await cateSchema.find({
      subSubCategoryName: { $regex: subSubCategory, $options: "i" },
    });
    if (categoryData.length > 0) {
      res.status(200).json({
        error: false,
        error_code: 200,
        message: "Success",
        results: {
          categoryData,
        },
      });
    } else {
      res.status(200).json({
        error: true,
        error_code: 200,
        message: Error,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: Error,
    });
  }
};

module.exports = {
  subSubCategory,
  subSubCategoryList,
  subSubCategoryUpdate,
  subSubCategorySearch,
  selectCategory,
  selectSubCategory,
  checkAttribute,
  checkStatus,
};
