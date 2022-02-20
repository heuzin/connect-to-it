import mongoose, { ConnectOptions } from 'mongoose';
import { config } from 'node-config-ts';
const db = config.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions);

        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;
