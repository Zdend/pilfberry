// @flow
import { Map } from 'immutable';

export const transformNestedRecords = (source: Object, nestedEntities: object = {}) => {
    const props = Object.keys(source).concat(Object.keys(nestedEntities))
        .filter((item, i, ar) => ar.indexOf(item) === i);
    const transformedObject = props.reduce((result, prop) => {
        const IEntity = nestedEntities[prop] ? nestedEntities[prop] : Map;
        let value;
        if (nestedEntities.hasOwnProperty(prop)) {
            value = testConstructor(IEntity) ? new IEntity(source[prop]) : IEntity(source[prop]);
        } else {
            value = source[prop];
        }
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


function testConstructor(fn) {
    try {
        return !!new fn();
    } catch (e) {
        return false;
    }
}