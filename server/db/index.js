import mongoose from 'mongoose';
import {registerModels} from './schema';

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




// function performAction (action, data, callback) {
//     MongoClient.connect(connectionURL, function(err, db) {
//         assert.equal(null, err);
//         console.log('Connected correctly to server');
//         action(db, data, (err, result) => {
//             if (callback) {
//                 callback(err, result);
//             }
//             db.close();
//         });
//     });
// }

// export function insertDocumentsAction (db, data, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Insert some documents
//     collection.insertMany([
//         {a : 1}, {a : 2}, {a : 3}
//     ], function(err, result) {
//         console.log("Inserted 3 documents into the document collection");
//         callback(result);
//     });
// }

// export const insertDocuments = (data, cb) => performAction(insertDocumentsAction, data, cb);

