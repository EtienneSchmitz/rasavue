import { Document, Schema, Model, model } from 'mongoose';
import { ILangModel } from '../interfaces/lang';
const arrayUniquePlugin = require('mongoose-unique-array');

let langSchema : Schema = new Schema({
  name: { type: String, unique: true, required: true, dropDups: true },
  url: { type: String, required: true, dropDups: true },
  slug: { type: String, unique: true, required: true, dropDups: true },
  categories: {
    type: Array,
    items: {
      name: { type: String, unique: true, dropDups: true },
      description: { type: String, dropDups: true },
      slug: { type: String, unique: true, dropDups: true }
    },
    default: undefined
  }
});

langSchema.plugin(arrayUniquePlugin);

export const lang: Model<ILangModel> = model<ILangModel>('lang', langSchema);
