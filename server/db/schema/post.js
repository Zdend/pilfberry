import mongoose, { Schema } from 'mongoose';
import { STATUSES, STATUS_DRAFT } from '../../../shared/constants';

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
        enum: STATUSES,
        default: STATUS_DRAFT
    },
    author: {
        type: Schema.ObjectId,
        ref: 'Post'
    }
});


export default mongoose.model('Post', postSchema);