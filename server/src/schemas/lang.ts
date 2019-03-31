import { Document, Schema, Model, model} from "mongoose";
import { ILangModel } from "../interfaces/lang";

let langSchema : Schema = new Schema({
    name: String,
    url: String,
    categories: {
        name: String,
        url: String
    }
});

export const lang: Model<ILangModel> = model<ILangModel>("lang", langSchema);