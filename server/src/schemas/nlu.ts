import { Document, Schema, Model, model } from 'mongoose';
import { IAgentModel, IIntentModel, IEntityModel, IEntityRegexpModel,
  IEntityLookupModel, IEntitySynonymsModel } from '../interfaces/nlu';

const agentSchema : Schema = new Schema({
  category_id: { type: Schema.Types.ObjectId, ref: 'category' },
  name: { type: String }
});

const intentSchema : Schema = new Schema({
  agentId: { type: Schema.Types.ObjectId, ref: 'intent' },
  text: { type: String },
  entities: [{
    start: Number,
    end: Number,
    value: String,
    entity_id: { type: Schema.Types.ObjectId, ref: 'entity' }
  }]
});

const entityBaseOptions = {
  discriminatorKey: 'type',
  collection: 'entities'
};

const entityBaseSchema : Schema = new Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: 'category' },
  entityName: { type: String, unique: true, dropDups: true}
}, entityBaseOptions);

let entityLookupSchema : Schema = new Schema({
  name: String,
  elements: Schema.Types.Mixed // String or [String]
});

let entityRegexpSchema : Schema = new Schema({
  name: String,
  pattern: String
});

let entitySynonymsSchema : Schema = new Schema({
  value: String,
  elements: String
});

const Entity = model<IEntityModel>('entity', entityBaseSchema);
Entity.discriminator<IEntityRegexpModel>('regexp', entityRegexpSchema);
Entity.discriminator<IEntityLookupModel>('lookup', entityLookupSchema);
Entity.discriminator<IEntitySynonymsModel>('synonyms', entitySynonymsSchema);
Entity.discriminator<IEntityModel>('simple', new Schema({}));

export const agent: Model<IAgentModel> = model<IAgentModel>('agent', agentSchema);
export const intent: Model<IIntentModel> = model<IIntentModel>('intent', intentSchema);
export const regexp : Model<IEntityRegexpModel> = model<IEntityRegexpModel>('regexp');
export const lookup : Model<IEntityLookupModel> = model<IEntityLookupModel>('lookup');
export const synonyms : Model<IEntitySynonymsModel> = model<IEntitySynonymsModel>('synonyms');
export const simple : Model<IEntityModel> = model<IEntityModel>('simple');
