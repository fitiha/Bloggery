import mongoose from "mongoose";
import blogs from "./data/blogData.js";
import users from "./data/userData.js";
import blogModel from "./models/blogModel.js";
import userModel from "./models/userModel.js";

mongoose.connect('mongodb+srv://admin:DGfsDLqhzNQQZ4yW@cluster0.mcijogw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('DB got Connected!')
    })
    .catch((err) => console.log("DB connection error: " + err));


const importData = async () => {
    try {
        await userModel.deleteMany();
        await blogModel.deleteMany();

        await userModel.insertMany(users);
        await blogModel.insertMany(blogs);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await userModel.deleteMany();
        await blogModel.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
