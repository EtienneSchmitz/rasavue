import { Document } from 'mongoose';

export interface ILangModel extends Document {
    name: String,
    url: String,
    slug ?: String,
    categories: [ICategory]
}

export interface ICategory extends Document {
    name: String,
    description: String,
    slug: String
}
