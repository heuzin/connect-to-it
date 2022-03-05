export interface Post {
    _id: string;
    user: string;
    text: string;
    name: string;
    avatar: string;
    likes: IPostLikes[];
    comments: IPostComments[];
    createdAt: Date;
}

export interface IPostLikes {
    user: string;
}
export interface IPostComments {
    _id: string;
    user: string;
    text: string;
    name: string;
    avatar: string;
    date: Date;
}
