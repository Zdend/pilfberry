import {idsArrayToMapOfRecords} from './';

export const one = (key, alias) => `one~${key}~${alias}`;
export const many = (key, alias) => `many~${key}~${alias}`;

export const SchemaRegister = (schemas) => {
    const processedSchemas = Object.keys(schemas).map(key => schemas[key]);
    const mapper = processedSchemas.reduce((result, schema) => {
        const emptyRecord = new schema();
        const mappings = emptyRecord.get('_fields');
        const entityName = emptyRecord.get('_entityName');
        if (mappings) {
            const keys = mappings.keys();
            for (const fk of keys) {
                const [relationship, collectionName, alias] = mappings.get(fk).split('~');
                const descriptor = {fk, relationship, collectionName};
                result[`${entityName}~${fk}`] = descriptor;
                if (alias) {
                    result[`${entityName}~${alias}`] = descriptor;
                }
            }
        }
        return result;
    }, {});
    return state => (element, path) => {
        const pathTokens = path.split('.');
        return pathTokens.reduce((element, token) => {
            const entityName = element.get('_entityName');
            const mapping = mapper[`${entityName}~${token}`];
            const targetCollection = mapping ? state[mapping.collectionName] : null;
            const isMany = mapping && mapping.relationship === 'many';
            const elementValue = element.get(mapping ? mapping.fk : token);
            const manyOrLastValue = isMany
                ? idsArrayToMapOfRecords(elementValue, targetCollection)
                : elementValue;

            return targetCollection && !isMany ? targetCollection.get(elementValue) : manyOrLastValue;
        }, element);
    };
};

//1. Register schemas for their relationship definition (this is done in models/index.js, so we do it only once)
//2. Inject entities relevant for your components - keys must mirror your _fields definition (this is done in container components - use only data you need through selectors)
//3. Query data using your first entity (This is done usually in components e.g. query(user, 'recordId.accountId.tradingName'))