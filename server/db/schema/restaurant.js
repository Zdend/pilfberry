import mongoose, { Schema } from 'mongoose';
import { STATUSES, STATUS_ACTIVE, TAGS } from '../../../shared/constants';

const photoSchema = new Schema({
    photoType: String,
    filename: String,
    contentType: String
});

const restaurantSchema = new Schema({
    name: String,
    address: {
        postcode: Number,
        street: String,
        suburb: String,
        city: String,
        state: String,
        country: String,
        latitude: Number,
        longitude: Number
    },
    status: {
        type: String,
        enum: STATUSES,
        default: STATUS_ACTIVE
    },
    tags: {
        type: Array,
        enum: TAGS,
        default: []
    },
    cuisines: {
        type: Array,
        default: []
    },
    description: String,
    url: String,
    created: Date,
    photos: [photoSchema]
});

export default mongoose.model('Restaurant', restaurantSchema);