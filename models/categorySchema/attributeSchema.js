const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  attributeName: {
    type: String,
    require: true,
  },
  shipmentService: {
    type: String,
    default: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  subSubCategory_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subSubCategory",
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("attributes", schema);
