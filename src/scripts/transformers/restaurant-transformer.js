
export function transformClientRestaurantToServer(restaurant) {
    const photos = restaurant.photos;
    return { ...restaurant, photos: Object.keys(photos).map(id => photos[id]) };
}