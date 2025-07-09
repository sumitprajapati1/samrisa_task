import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {checkoutController, getMockData} from "./controller/checkoutController.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Optional : Using real database 
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

//post to save data
app.post('/api/checkout', checkoutController);

// get to view data , paste this link to see the stored data in browser : http://localhost:8080/api/checkout
app.get("/api/checkout", getMockData);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
