export function toDBRestaurant(dbRestaurant, formRestaurant) {
    dbRestaurant.name = formRestaurant.name;
    dbRestaurant.address = { ...formRestaurant.address };
    return dbRestaurant;
}