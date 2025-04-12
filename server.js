const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());  // Support base64 images

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes 
const formRoute = require("./src/routes/formRoute");
const authRoute = require("./src/routes/authRoute");
app.use("/api/form", formRoute);
app.use("/api/form", authRoute);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
