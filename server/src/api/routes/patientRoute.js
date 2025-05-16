const express=require("express");
const controller=require("./../controllers/paientController")
const {body,query,param}=require("express-validator")

const router=express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   
    cb(null,"./../client/app/src/assets");
  },
  filename: (req, file, cb) => {
    cb(
         null,
      new Date().toLocaleDateString().replace(/\//g, "") + "-" +
      new Date().toLocaleTimeString('it-IT').replace(/:/g, "") + "-" +
      file.originalname
    );
  },
});
const upload = multer({ storage: storage }).single('file');



router.post('', upload, (req, res, next) => {
    const file = req.file;
    
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })
router.get("",controller.getAllPatient);
router.post("",[
    body("first_name").isAlpha().withMessage("first_name should be string "),
    body("last_name").isAlpha().withMessage("last_name should be string "),
    body("age").isInt().withMessage("patient age should be Intger"),
    body("gender").isAlpha().custom((value,{req})=>{
        if(value=="male" || value=="female" )
        {  return true;
        }
        throw new Error("gender should be male or female ");
    }).withMessage("gender should be string in Male or Female"),
    body("address").isAlpha().withMessage("address should be string ")
 
    ]
,controller.createPatient);
router.put("",upload,[
  
    body("first_name").isAlpha().withMessage("first_name should be string "),
    body("last_name").isAlpha().withMessage("last_name should be string "),
    body("age").isInt().withMessage("patient age should be Intger"),
    body("gender").isAlpha().withMessage("gender should be string in Male or Female"),
    body("address").isAlpha().withMessage("address should be string ")
   
    ],controller.updatePatient);
router.delete("/:_id",[param("_id").isMongoId().withMessage("_id Should be ObjectID")]
,controller.deletePatient);
router.get("/:_id",[param("_id").isMongoId().withMessage("_id Should be ObjectID")],controller.getPatient);


router.put("/addDoctortoPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("doctor").isMongoId().withMessage("DoctorID should be objectID ")],controller.addDoctortoPatient);

router.put("/addAppointmenttoPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("appointment").isMongoId().withMessage("Appointment ID should be objectID ")],controller.addAppointmenttoPatient);

router.put("/addPrescriptiontoPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("prescription").isMongoId().withMessage(" Prescriptions ID should be objectID ")],controller.addPrescriptiontoPatient);

router.put("/deleteDoctorfromPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("doctor").isMongoId().withMessage("DoctorID should be objectID ")],controller.deleteDoctorfromPatient);

router.put("/deleteAppointmentfromPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("appointment").isMongoId().withMessage("Appointment ID should be objectID ")],controller.deleteAppointmentfromPatient);

router.put("/deletePrescriptionfromPatient",
[body("_id").isMongoId().withMessage("patientID should be objectID "),
body("prescription").isMongoId().withMessage(" Prescriptions ID should be objectID ")],controller.deletePrescriptionfromPatient);
 module.exports=router;