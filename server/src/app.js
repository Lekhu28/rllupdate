const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authentication = require("./api/routes/auth.routes");
const payment = require("./api/routes/payment.routes");
require("./api/db/mongoose");
const app = express();
app.use(cors())


const doctorRouter = require("./api/routes/doctorRouter");
const receptionistRouter = require("./api/routes/ReceptionistRouter");
const medicineRoute = require("./api/routes/medicineRoute");
const prescriptionRoute = require("./api/routes/prescriptionRoute");
const patientRoute = require("./api/routes/patientRoute");
const appointmentRouter = require("./api/routes/appointmentRoute");
const uploadRouter = require("./api/routes/uploadRouter");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server Running on port http://localhost:${PORT}`);
});

// **** -----------Middleware------------------- ***********
// register morgan middleware
app.use(morgan("dev"));

// allow requests
app.use((request,response,next)=>{
  response.header("Access-Control-Allow-Origin","*");
  response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
  response.header("Access-Control-Allow-Headers","Content-Type,Authorization")
  next();
})

// register body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ************** -----------routing-------------------*****************
app.get("/", (req, res, next) => {
  res.send("welcome to API!!");
});
app.use(authentication);
app.use(payment);


// routes
app.use("/doctors", doctorRouter);
app.use("/receptionists", receptionistRouter);
app.use("/medicine", medicineRoute);
app.use("/prescription", prescriptionRoute);
app.use("/patient", patientRoute);
app.use("/appointments", appointmentRouter);
app.use("/upload", uploadRouter);

//  for unhandled routes
app.use((request, response) => {
  response.send("Their is no page for this route");
});

//************* On Error MiddleWare ************/
app.use((err, req, res, next) => {
  console.log(err)
  res
    .status(err.status || 500)
      .json({message : `${JSON.stringify(err.message)}`});
});
