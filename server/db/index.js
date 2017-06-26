import { Restaurant, User } from './schema';
import { restaurants, users } from './data';
import { NEW_ID, STATUS_DELETED, STATUS_ACTIVE } from '../../shared/constants';

export function findAllRestaurants(criteria = {}) {
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
        return Restaurant.create({ ...restaurant, created: new Date() });
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
        }).then(() => Restaurant.findByIdAndUpdate(id, restaurant, { new: true }).exec());
}

export function getRestaurantPaths() {
    return Restaurant.find({ status: STATUS_ACTIVE }, 'path')
        .exec()
        .then(restaurantObjects => restaurantObjects.map(r => r.path).join('|'));
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

export function fillInPaths() {
    return Restaurant.find().exec()
        .then(restaurants => {
            restaurants.forEach(restaurant => {
                const name = restaurant.name;
                const path = name.toLowerCase().trim().replace(/[^a-z\- \d]/g, '').replace(/[\s|-]+/g, '-');
                restaurant.path = path;
                console.log(path);
                return restaurant.save();
            });
        })
        .catch(console.error);
}