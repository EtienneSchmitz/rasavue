import { Document } from "mongoose";

export interface ILangModel extends Document {
    name: String,
    url: String,
    slug ?: String,
    categories ?: {
        name: String,
        url: String
    }
}