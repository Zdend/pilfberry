/* global module */
import {SchemaRegister} from '../services/schema-services';
import User from './user';
import Credentials from './credentials';
import Language from './language';
import Objective from './objective';
import Contact from './contact';
import Record from './record';

const Models = {User, Credentials, Language, Objective, Contact, Record};

const sessionInitialiser = SchemaRegister(Models);
module.exports = {
    ...Models,
    sessionInitialiser
};