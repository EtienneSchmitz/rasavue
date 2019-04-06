import { Document } from 'mongoose';

export interface IAgentModel extends Document {
    categoryId : number,
    name : string
}

export interface IIntentModel extends Document {
    agentId : number
    text : string,
    entities : [{
          start : number,
          end : number,
          value : string,
          entityId : number
    }]
}

export enum TypeEntity {
    Lookup = 'lookup',
    Regexp = 'regexp',
    Synonyms = 'synonyms',
    Simple = 'simple'
}

export interface IEntityModel extends Document {
    categoryId : number,
    entityName : string,
    type : TypeEntity
}

export interface IEntityLookupModel extends IEntityModel {
    name: string,
    elements : [string] | string
}

export interface IEntitySynonymsModel extends IEntityModel {
    value: string,
    synonyms : [string]
}

export interface IEntityRegexpModel extends IEntityModel {
    name: string,
    pattern : string
}
