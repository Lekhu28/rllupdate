const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("../controllers/medicineController");
const router = express.Router();

//---------------------------- Get All Medicines
router.get("", controller.getMedicines);

//---------------------------- Get Medicine By ID
router.get("/:_id", [param('_id').isMongoId().withMessage("ID should be ObjectId")], controller.getMedicine);

//---------------------------- Add Medicine
router.post("", [
    body("name").isAlpha().withMessage("Medicine name should be String"),
    body("description").isString().withMessage("Medicine description should be string")
], controller.createMedicine);

//---------------------------- Update Medicine
router.put("", [
    body("name").isAlpha().withMessage("Medicine name should be String"),
    body("description").isString().withMessage("Medicine description should be string")
], controller.updateMedicine);

//---------------------------- Delete Medicine
router.delete("/:_id", [param("_id").isMongoId().withMessage("ID Should be ObjectID")], controller.deleteMedicine);

module.exports = router;
