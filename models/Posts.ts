import { Document, model, ObjectId } from 'mongoose';
import mongoose from 'mongoose';

export interface IPostDocument extends Document {
    user: ObjectId;
    text: string;
    name: string;
    avatar: string;
    likes: IPostLikes[];
    comments: IPostComments[];
}

export interface IPostLikes {
    user: ObjectId;
}

export interface IPostComments extends Document {
    user: ObjectId;
    text: string;
    name: string;
    avatar: string;
    date: Date;
}

const PostSchema = new mongoose.Schema<IPostDocument>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                },
                avatar: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Post = model<IPostDocument>('Post', PostSchema);

export default Post;
