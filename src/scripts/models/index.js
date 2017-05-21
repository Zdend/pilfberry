/* global module */
import { SchemaRegister } from '../services/schema-services';
import User from './user';
import Credentials from './credentials';
import Restaurant, { restaurantDef } from './restaurant';

const Models = { User, Credentials, Restaurant };
const ModelDefinitions = { restaurantDef };

const sessionInitialiser = SchemaRegister(Models);
module.exports = {
    ...Models,
    ...ModelDefinitions,
    sessionInitialiser
};