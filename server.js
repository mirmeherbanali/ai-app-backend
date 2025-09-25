const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/product", require("./routes/productRoutes"));

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
    );
  });
});
