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
const formRoute = require("./routes/formRoute");
const authRoute = require("./routes/authRoute");
const expansiveRoute = require("./routes/expansiveRoute");

// const billRoute = require("./controllers/billCountroller");

app.use("/api/form", formRoute);
// app.use("/api/form", billRoute);

app.use("/api/form", authRoute);
app.use("/api/form", expansiveRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
