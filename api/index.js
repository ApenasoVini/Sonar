import dotenv from 'dotenv';
import express from 'express';
import db from './src/db/db.js';
import userRoutes from './src/routes/user/userRoutes.js';
import authRoutes from './src/routes/auth/authRoutes.js';
import musicRoutes from './src/routes/music/musicRoutes.js';
import albumRoutes from './src/routes/album/albumRoutes.js';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/music", musicRoutes);
app.use("/auth", authRoutes);
app.use("/album", albumRoutes);
app.get('/', (req, res) => {
    return res.status(200).json({ "msg": "This is the Sonar API" });
});

try {
    db.sync()
        .then(() => {
            console.log("All models were synchronized successfully.");
        })
        .catch((error) => {
            console.error("Error synchronizing the models:", error);
        });
    app.listen(process.env.PORT || 8000, () => console.log(`Server running on http://localhost:${process.env.PORT || 8000}\n`));
} catch (err) {
    console.error(`\nError in running server: ${err}\n`);
}