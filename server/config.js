import * as configDev from './config.dev';
import * as configProd from './config.prod';

export const isDev = process.env.NODE_ENV !== 'production';
const config = isDev ? configDev : configProd;

export const ROOT_PATH = config.ROOT_PATH;
export const RESTAURANTS_PATH = config.RESTAURANTS_PATH;
export const CONNECTION_URL = process.env.forceProdDb ? configProd.CONNECTION_URL : config.CONNECTION_URL;
export const SERVER_PORT = config.SERVER_PORT;
export const FB_API_KEY = config.FB_API_KEY;
