const reporterSchema = require("../../models/reportsSchema/reportsSchema");
const userSchema = require("../../models/userSchema/userSchema");
const productSchema = require("../../models/categorySchema/productSchema");
const { success, error } = require("../response");

const createReporter = async (req, res) => {
  try {
    const reporter = new reporterSchema(req.body);
    const saveData = await reporter.save();
    res.status(200).json(success(res.statusCode, "Success", { saveData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

const reporterList = async (req, res) => {
  try {
    const list = await reporterSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

const userView = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await userSchema.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { details }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

const productView = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await productSchema.findById(id);
    res
      .status(200)
      .json(success(res.statusCode, "Success", { productDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

module.exports = {
  createReporter,
  reporterList,
  userView,
  productView,
};
