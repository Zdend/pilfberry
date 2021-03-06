import mongoose, { Schema } from 'mongoose';
import { STATUSES, STATUS_ACTIVE, TAGS, PHOTO_TYPES, PHOTO_TYPE, PRICE } from '../../../shared/constants';

const photoSchema = new Schema({
    photoType: {
        type: String,
        enum: PHOTO_TYPES,
        default: PHOTO_TYPE.AVATAR
    },
    filename: String,
    contentType: String
});

const restaurantSchema = new Schema({
    path: String,
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
    phoneNumber: String,
    email: String,
    price: {
        type: Number,
        enum: PRICE
    },
    photos: [photoSchema]
});

export default mongoose.model('Restaurant', restaurantSchema);