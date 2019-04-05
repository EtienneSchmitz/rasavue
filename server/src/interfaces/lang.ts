import { Document } from 'mongoose';

export interface ILangModel extends Document {
    name: String,
    url: String,
    slug ?: String,
    categories ?: [number],
    categoryItem ?: [ICategoryModel]
}

export interface ICategoryModel extends Document {
    lang_id : number,
    name: String,
    description: String,
    slug: String
}
