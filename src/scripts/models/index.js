/* global module */
import {SchemaRegister} from '../services/schema-services';
import User from './user';
import Credentials from './credentials';
import Language from './language';
import Objective from './objective';
import Contact from './contact';
import Record from './record';
import Restaurant from './restaurant';

const Models = {User, Credentials, Language, Objective, Contact, Record, Restaurant};

const sessionInitialiser = SchemaRegister(Models);
module.exports = {
    ...Models,
    sessionInitialiser
};