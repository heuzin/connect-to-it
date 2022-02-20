import { Document, Schema, Model, model } from 'mongoose';
import mongoose from 'mongoose';
export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const User = model<IUserDocument>('User', UserSchema);

export default User;
