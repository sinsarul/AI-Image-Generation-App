import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    name: {type: String, required: true},
    promt: {type: String, required: true},
    photo: {type: String, required: true},   
});

const PostSchema = mongoose.model("post", post);

export default PostSchema;