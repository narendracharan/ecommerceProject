const express=require("express")
const router=express.Router()
const valuesControllers=require("../../controllers/userPanel/valuesControllers")

router.post("/createValues",valuesControllers.createValues)
router.get("/valuesList",valuesControllers.valuesList)
router.patch("/valuesUpdate/:id",valuesControllers.valuesUpdate)
router.get("/valuesSearch",valuesControllers.valuesSearch)
router.get("/selectCategory",valuesControllers.selectCategory)
router.get("/selectSubCategory",valuesControllers.selectSubCategory)
router.get("/selectSubSubCategory",valuesControllers.selectSubSubCategory)
router.get("/selectAttribute",valuesControllers.selectAttribute)
router.patch("/checkStatus/:id",valuesControllers.checkStatus)
module.exports=router