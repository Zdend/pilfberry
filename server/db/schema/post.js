import mongoose, { Schema } from 'mongoose';
import { POST_STATUSES, STATUS_DRAFT, POST_CATEGORIES, POST_CATEGORY } from '../../../shared/constants';

const postSchema = new Schema({
    title: String,
    path: {
        type: String,
        required: true
    },
    content: String,
    dateCreated: Date,
    dateUpdated: Date,
    status: {
        type: String,
        enum: POST_STATUSES,
        default: STATUS_DRAFT
    },
    category: {
        type: String,
        enum: POST_CATEGORIES,
        default: POST_CATEGORY.POST
    },
    author: {
        type: Schema.ObjectId,
        ref: 'Post'
    }
});


export default mongoose.model('Post', postSchema);