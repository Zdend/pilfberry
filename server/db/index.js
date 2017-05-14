import mongoose from 'mongoose';
import { Restaurant, User } from './schema';
import { restaurants, users } from './data';
import { NEW_ID, STATUS_DELETED } from '../../shared/constants';

mongoose.Promise = global.Promise;
const connectionURL = 'mongodb://localhost:27017/pilfberry';
mongoose.connect(connectionURL);

export function findAllRestaurants(criteria = {}) {
    return Restaurant.find(criteria).exec();
}

export function findRestaurant(id) {
    return Restaurant.findOne({ _id: id }).exec();
}

export function findUserByEmail(email) {
    return User.findOne({ email }).exec();
}

export function deleteRestaurant(id) {
    return Restaurant.findByIdAndUpdate(id, { status: STATUS_DELETED }, { new: true }).exec();
}

export function saveRestaurant(id, restaurant) {
    if (id === NEW_ID) {
        return Restaurant.create(restaurant);
    }
    return Restaurant.findByIdAndUpdate(id, restaurant, { new: true }).exec();
}


export function uploadMockData() {
    Restaurant.count({})
        .then(count => {
            if (count) return [];
            return Restaurant.insertMany(restaurants).exec();
        })
        .then(docs => console.log('Restaurants uploaded', docs.length))
        .catch(console.error);

    User.count({})
        .then(count => {
            if (count) return [];
            return User.insertMany(users).exec();
        })
        .then(docs => console.log('Users uploaded', docs.length))
        .catch(console.error);
}