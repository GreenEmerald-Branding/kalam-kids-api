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
const miscBillRoute = require("./routes/miscBillRoute");
const categoryRoute = require("./routes/categoryRoute");
const predefinedMiscItemRoute = require("./routes/predefinedMiscItemRoute");
const billRoute = require("./routes/billRoute");


app.use("/api/auth", authRoute);
app.use("/api/form", formRoute);
app.use("/api/expansive", expansiveRoute);
app.use("/api/misc-bills", miscBillRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/predefined-misc-items", predefinedMiscItemRoute);
app.use("/api/bills", billRoute);


// Server
const PORT = process.env.PORT || 5000;
// Add a generic catch-all route for debugging (MUST be after all other routes)
app.all('*', (req, res) => {
    console.log(`[DEBUG] Unhandled request: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Resource not found or handler missing' });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

