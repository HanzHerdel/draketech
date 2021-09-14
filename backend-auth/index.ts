import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/mongo.config.js";

connectDB();

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = authRoutes(router);
app.use("/oauth", routes);

// Error handling
//app.use(app.oauth.errorHandler());

const PORT = process.env.PORT_AUTH || 3001;

app.listen(PORT);
console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
