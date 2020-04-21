import { Restaurant, User, Post } from './schema';
import { restaurants, users } from './data';
import { NEW_ID, STATUS_DELETED, STATUS_ACTIVE } from '../../shared/constants';
import { dashify } from '../../shared/utils/string';


function findAll(criteria) {
    return Restaurant.find(criteria);
}
export function findAllRestaurants(criteria = { status: STATUS_ACTIVE }) {
    return findAll(criteria).exec();
}


export function findAllRestaurantsLean(criteria = { status: STATUS_ACTIVE }) {
    return findAll(criteria).lean().exec();
}

export function findRestaurant(id) {
    return Restaurant.findOne({ _id: id }).exec();
}

export function findUserByEmail(email) {
    return User.findOne({ email }).exec();
}

export function findEntityByPath(entity, path) {
    return entity.findOne({ path }).exec();
}

export function findRestaurantByPath(path) {
    return findEntityByPath(Restaurant, path);
}


export function deleteRestaurant(id) {
    return Restaurant.findByIdAndUpdate(id, { status: STATUS_DELETED }, { new: true }).exec();
}

export async function saveRestaurant(id, restaurant) {
    const photos = restaurant.photos;
    delete restaurant.photos;
    if (id === NEW_ID) {
        const path = await getUniquePath(restaurant, restaurant.name, restaurant.address && restaurant.address.suburb);
        return Restaurant.create({ ...restaurant, path, created: new Date() });
    }
    const doc = await Restaurant.findById(id);
    const persistedPhotos = doc.photos;
    if (photos && persistedPhotos) {
        photos.forEach(photo => {
            const persistedPhoto = persistedPhotos.id(photo.id);
            if (persistedPhoto) {
                persistedPhoto.photoType = photo.photoType;
            }
        });
    }

    await doc.save();
    const path = restaurant.address && restaurant.title ? await getUniquePath(restaurant) : null;

    return Restaurant.findByIdAndUpdate(id, path ? { ...restaurant, path } : restaurant, { new: true }).exec();
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

function findEntityByPathNotId(entity, path, id) {
    return entity.findOne({ path, _id: { $ne: id } }).exec();
}
async function incrementNumberInPath(path, finder) {
    const suffix = path.substring(path.lastIndexOf('-') + 1, path.length);
    const convertedNumber = isNaN(Number(suffix)) ? 1 : Number(suffix) + 1;
    const editedPath = convertedNumber > 1 ? `${path.substring(0, path.lastIndexOf('-'))}-${convertedNumber}` : `${path}-1`;
    const anyEntity = await finder(editedPath);
    if (!anyEntity) {
        return editedPath;
    }
    return incrementNumberInPath(editedPath, finder);
}
async function getUniquePath(entity, primaryToken, secondaryToken) {
    const { id } = entity;
    const entities = [Restaurant, Post];
    const path = dashify(primaryToken);
    const pathSecondary = dashify(`${primaryToken} ${secondaryToken || ''}`);
    const finder = async expression => {
        const promises = entities.map(currentEntity => id !== NEW_ID
            ? findEntityByPathNotId(currentEntity, expression, id)
            : findEntityByPath(currentEntity, expression));
        const results = await Promise.all(promises);
        return results.some(doc => doc);
    };
    const anyEntityByPath = await finder(path);
    if (!anyEntityByPath) {
        return path;
    }
    const anyEntityBySecondaryToken = await finder(pathSecondary);
    if (!anyEntityBySecondaryToken && secondaryToken) {
        return pathSecondary;
    }
    return incrementNumberInPath(path, finder);
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

export function findAllPosts(criteria = { status: { $ne: STATUS_DELETED } }) {
    return Post.find(criteria).exec();
}

export function findAllActivePosts(criteria = { status: STATUS_ACTIVE }) {
    return Post.find(criteria).exec();
}

export async function savePost(id, post) {
    delete post.author;
    delete post.dateCreated;
    delete post.dateUpdated;
    const path = await getUniquePath(post, post.title, 'post');
    if (id === NEW_ID) {
        return Post.create({ ...post, path, dateCreated: new Date() });
    }
    return Post.findByIdAndUpdate(id, { ...post, path }, { new: true }).exec();
}

export function findPost(id) {
    return Post.findOne({ _id: id }).exec();
}

export function getPostPaths() {
    return Post.find({ status: STATUS_ACTIVE }, 'path').exec();
}

export function findPostByPath(path) {
    return findEntityByPath(Post, path);
}

export function findAllPostsLean(criteria = { status: STATUS_ACTIVE }) {
    return Post.find(criteria).lean().exec();
}

export function deletePost(id) {
    return Post.findByIdAndUpdate(id, { status: STATUS_DELETED }, { new: true }).exec();
}

