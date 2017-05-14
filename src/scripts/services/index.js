// @flow
import { Map } from 'immutable';

export const transformNestedRecords = (source: Object, nestedEntities: object = {}) => {
    const transformedObject = Object.keys(source).reduce((result, prop) => {
        const IEntity = nestedEntities[prop] ? nestedEntities[prop] : Map;
        const value = nestedEntities.hasOwnProperty(prop)
            ? new IEntity(source[prop]) : source[prop];
        result[prop] = value;
        return result;
    }, {});
    transformedObject.id = source['_id'];
    return transformedObject;
};

export const transformNestedRecordArray = (source: Object, Record: any = Map, nestedEntities: object) => {
    const transformedObject = transformNestedRecords(source, nestedEntities);
    return [transformedObject.id, new Record(transformedObject)];
}

export const transformNestedRecordObject = (source: Object, Record: any = Map, nestedEntities: object) => {
    const transformedObject = transformNestedRecords(source, nestedEntities);
    return { [transformedObject.id]: new Record(transformedObject) };
}

export const arrayToMapById = (collection: Array<Object>, Record: any = Map, MapType: any = Map, nestedEntities: Object) => {
    return new MapType(collection.map(item => transformNestedRecordArray(item, Record, nestedEntities)));
};

export const idsArrayToMapOfRecords = (ids: Array<string>, records: any) => Map(ids.map(id => [id, records.get(id)]));