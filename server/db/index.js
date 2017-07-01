import { Restaurant, User } from './schema';
import { restaurants, users } from './data';
import { NEW_ID, STATUS_DELETED, STATUS_ACTIVE } from '../../shared/constants';
import { dashify } from '../../shared/utils/string';


export function findAllRestaurants(criteria = { status: STATUS_ACTIVE }) {
    return Restaurant.find(criteria).exec();
}

export function findRestaurant(id) {
    return Restaurant.findOne({ _id: id }).exec();
}

export function findUserByEmail(email) {
    return User.findOne({ email }).exec();
}

export function findRestaurantByPath(path) {
    return Restaurant.findOne({ path }).exec();
}

export function deleteRestaurant(id) {
    return Restaurant.findByIdAndUpdate(id, { status: STATUS_DELETED }, { new: true }).exec();
}

export function saveRestaurant(id, restaurant) {
    const photos = restaurant.photos;
    delete restaurant.photos;
    if (id === NEW_ID) {
        return getUniquePath(restaurant)
            .then(path => Restaurant.create({ ...restaurant, path, created: new Date() }));
    }
    return Restaurant.findById(id)
        .then(doc => {
            const persistedPhotos = doc.photos;
            if (!photos || !persistedPhotos) {
                return;
            }
            photos.forEach(photo => {
                const persistedPhoto = persistedPhotos.id(photo.id);
                if (persistedPhoto) {
                    persistedPhoto.photoType = photo.photoType;
                }
            });
            return doc.save();
        })
        .then(() => getUniquePath(restaurant))
        .then(path => Restaurant.findByIdAndUpdate(id, { ...restaurant, path }, { new: true }).exec());
}

export function getRestaurantPaths() {
    return Restaurant.find({ status: STATUS_ACTIVE }, 'path address.suburb')
        .exec();
}
export function findRestaurantsBySuburb(suburb) {
    return Restaurant.find({
        'address.suburb': { $regex: `.*${suburb}.*`.replace('-', '.*').trim(), $options: 'i' },
        status: STATUS_ACTIVE
    }).exec();
}

export function uploadMockData() {
    Restaurant.count({})
        .then(count => {
            if (count) return [];
            return Restaurant.insertMany(restaurants);
        })
        .then(docs => console.log('Restaurants uploaded', docs.length))
        .catch(console.error);

    User.count({})
        .then(count => {
            if (count) return [];
            return User.insertMany(users);
        })
        .then(docs => console.log('Users uploaded', docs.length))
        .catch(console.error);
}

function findRestaurantByPathNotId(path, id) {
    return Restaurant.findOne({ path, _id: { $ne: id } }).exec();
}
function incrementNumberInPath(path, finder) {
    const suffix = path.substring(path.lastIndexOf('-') + 1, path.length);
    const convertedNumber = isNaN(Number(suffix)) ? 1 : Number(suffix) + 1;
    const editedPath = convertedNumber > 1 ? `${path.substring(0, path.lastIndexOf('-'))}-${convertedNumber}` : `${path}-1`;
    return finder(editedPath)
        .then(r => r ? incrementNumberInPath(editedPath, finder) : editedPath);
}
function getUniquePath(restaurant) {
    const { name, address: { suburb }, id } = restaurant;
    const path = dashify(name);
    const pathSuburb = dashify(`${name} ${suburb ? suburb : ''}`);
    const finder = expression => id !== NEW_ID ? findRestaurantByPathNotId(expression, id) : findRestaurantByPath(expression);
    return finder(path)
        .then(r => r ? finder(pathSuburb) : path)
        .then(r => {
            if (typeof r === 'string') {
                return r;
            }
            if (!r && suburb) {
                return pathSuburb;
            }
            return incrementNumberInPath(path, finder);
        });
}


// export function fillInPaths() {
//     return Restaurant.find().exec()
//         .then(restaurants => {
//             restaurants.forEach(restaurant => {
//                 const name = restaurant.name;
//                 const path = dashify(name);
//                 restaurant.path = path;
//                 console.log(path);
//                 return restaurant.save();
//             });
//         })
//         .catch(console.error);
// }