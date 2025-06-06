const mongoose = require("mongoose");
require("dotenv").config();

// Check if the MONGO_URI environment variable is set
// const mongoURI = "mongodb://localhost:27017/clinic_system";
const mongoURI = "mongodb+srv://lekhu:8520@cluster0.npeacfc.mongodb.net/clinic"

if (!mongoURI) {
  console.error("❌ Error: MONGO_URI is not defined in environment variables.");
  process.exit(1); // Exit the process with failure
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("✅ DB Connected Successfully");
  })
  .catch((error) => {
    console.error("❌ DB Connection Problem:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  });
