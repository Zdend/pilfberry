import mongoose, {Schema} from 'mongoose';

const restaurantSchema = () => new Schema({
    name: String,
    address: {
        postcode: Number,
        street: String,
        suburb: String,
        city: String,
        state: String,
        country: String
    }
});

export default () => mongoose.model('Restaurant', restaurantSchema());