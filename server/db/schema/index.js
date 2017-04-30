import {model} from 'mongoose';
import Restaurant from './restaurant';

export function registerModels() {
    return {
        Restaurant: Restaurant()
    };
}