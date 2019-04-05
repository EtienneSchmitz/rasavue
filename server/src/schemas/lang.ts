import { Document, Schema, Model, model } from 'mongoose';
import {ICategoryModel, ILangModel} from '../interfaces/lang';
const arrayUniquePlugin = require('mongoose-unique-array');

let langSchema : Schema = new Schema({
  name: { type: String, unique: true, required: true, dropDups: true },
  url: { type: String, required: true, dropDups: true },
  slug: { type: String, unique: true, required: true, dropDups: true },
  categories : [
      { type: Schema.Types.ObjectId, ref: 'category' }
  ]
});

let categorySchema : Schema = new Schema({
    lang_id: { type: Schema.Types.ObjectId, ref: 'lang'},
    name: { type : String },
    description: { type:  String, dropDups: true },
    slug: { type: String, unique: true, dropDups: true }
});

export const lang: Model<ILangModel> = model<ILangModel>('lang', langSchema);
export const category : Model<ICategoryModel> = model<ICategoryModel>('category', categorySchema);