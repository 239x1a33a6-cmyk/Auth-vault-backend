require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./connection");
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

connectDB(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`Server Connected On ${PORT}`));
