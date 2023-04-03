const cateSchema = require("../../models/categorySchema/categorySchema");
const subcategory = require("../../models/categorySchema/subCategorySchema");
const subSubCategorySchema = require("../../models/categorySchema/subSubCategorySchema");


const createCategory = async (req, res) => {
  const category = new cateSchema(req.body);
  const {status}=req.body;
  try {
    const filepath = `/uploads/${req.file.filename}`;
    category.categoryPic = filepath;
    const saveCategoty=  await category.save();
    if(status =="true"){
      res.status(201).json({
        error:false,
        error_code:201,
         message: "Category Create Successfully",
         results:{
          saveCategoty
         }
       });
    }else{
      res.status(400).json({
        error:false,
        error_code:400,
         message: "Permission Not Allowed"
       });
    }
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: "Error",
    });
  }
};

const checkStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const updateStatus=await cateSchema.findByIdAndUpdate(id,req.body,{new:true})
     res.status(200).json({
      status:"Success",
      updateStatus
     })
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: err.message,
    });
  }
};


const checkSubCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const subCategoryData = await subcategory.find({ category_Id: id });
    const subSubCategoryData = await subSubCategorySchema.find({
      category_Id: id,
    });
    res.status(200).json({
      error: false,
      error_code: 200,
      message: "Success",
      results: {
        subCategoryData,
        subSubCategoryData,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: "Error",
    });
  }
};

const categoryList = async (req, res) => {
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
      message: "Error",
    });
  }
};

const categoryUpdate = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      error: false,
      error_code: 200,
      message: "Success",
      results: {
        updated,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: "Error",
    });
  }
};

const categorySearch = async (req, res) => {
  const category = req.body.categoryName;
  try {
    const categoryData = await cateSchema.find({
      categoryName: { $regex: category, $options: "i" },
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
        message: "Error",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: "Error",
    });
  }
};

module.exports = {
  createCategory,
  categoryList,
  categoryUpdate,
  categorySearch,
  checkSubCategory,
  checkStatus
};
