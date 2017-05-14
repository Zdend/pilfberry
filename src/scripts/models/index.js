/* global module */
import { SchemaRegister } from '../services/schema-services';
import User from './user';
import Credentials from './credentials';
import Language from './language';
import Restaurant, { Address } from './restaurant';

const Models = { User, Credentials, Language, Restaurant, Address };

const sessionInitialiser = SchemaRegister(Models);
module.exports = {
    ...Models,
    sessionInitialiser
};