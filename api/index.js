import dotenv from 'dotenv';
import express from 'express';
import db from './src/db/db.js';
import userRoutes from './src/routes/user/userRoutes.js';

dotenv.config();
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/user", userRoutes);
app.get('/', (req, res) => {
    return res.status(200).json({"msg": "This is the Sonar API"});
});

try {
    db.sync({})
        .then(() => {
            console.log("All models were synchronized successfully.");
        })
        .catch((error) => {
            console.error("Error synchronizing the models:", error);
        });
    app.listen(process.env.PORT || 8000, () => console.log(`Server running on http://localhost:${process.env.PORT || 8000}\n`));
} catch(err) {
    console.error(`\nError in running server: ${err}\n`);
}