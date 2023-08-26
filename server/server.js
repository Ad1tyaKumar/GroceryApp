import app from './app.js';
import dotenv from 'dotenv'
import connDB from './config/database.js'
import cloudinary from 'cloudinary'
import cors from "cors";

dotenv.config({ path: './config/config.env' })

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

connDB();
app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT : ${process.env.PORT}`);
});
