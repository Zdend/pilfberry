import mongoose from 'mongoose';
import {registerModels} from './schema';
import {restaurants} from './data';

mongoose.Promise = global.Promise;
const connectionURL = 'mongodb://localhost:27017/pilfberry';
mongoose.connect(connectionURL);
const {Restaurant} = registerModels();

export function findAllRestaurants () {
    return new Promise((resolve, reject) => {
        Restaurant.find({}, function(err, restaurants) {
            if (err) reject(err);
            resolve(restaurants);
        });
    });
}


export function uploadMockData () {
    Restaurant.count({}, (err, result) => {
        if (result) {
            return;
        }
        Restaurant.insertMany(restaurants, function(error, docs) {
            if (error) throw new Exception(error);
            console.log('Restaurants uploaded', docs.length);
        });
    });

}