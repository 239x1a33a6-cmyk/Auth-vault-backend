require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
const connectDB = require("./connection");
connectDB(process.env.MONGO_URI);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server Connected On ${PORT}`));

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
