import express from "express";
import dotenv from "dotenv";

dotenv.config();
let app = express();
app.listen(process.env.PORT || 3000);
console.log("Server listening on port 3000");