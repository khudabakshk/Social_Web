import mongoose from "mongoose";

let initialized = false;

export const connectDB = async () => {
    mongoose.set("strictQuery", false);

    if (initialized) {
        console.log("Database is already connected");
        return;
    }

    if (!process.env.MONGO_URL) {
        console.error("MONGO_URL is not defined in environment variables.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'Social-web',
        });
        console.log("Database is connected successfully");
        initialized = true;
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
    }
};
