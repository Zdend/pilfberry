// @flow
import {Map} from 'immutable';

export const arrayToMapById = (collection: Array<Object>, Record: any, MapType: any = Map) =>
    new MapType(collection.map(item => [item.id, new Record(item)]));

export const idsArrayToMapOfRecords = (ids: Array<string>, records: any) => Map(ids.map(id => [id, records.get(id)]));