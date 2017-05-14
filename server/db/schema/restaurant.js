import mongoose, { Schema } from 'mongoose';
import { STATUSES, STATUS_ACTIVE } from '../../../shared/constants';

const restaurantSchema = new Schema({
    name: String,
    address: {
        postcode: Number,
        street: String,
        suburb: String,
        city: String,
        state: String,
        country: String
    },
    status: {
        type: String,
        enum: STATUSES,
        default: STATUS_ACTIVE
    }
});

export default mongoose.model('Restaurant', restaurantSchema);