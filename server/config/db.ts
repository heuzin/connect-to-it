import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI!, {
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
