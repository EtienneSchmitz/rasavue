import { Document, Schema, Model, model} from "mongoose";
import { ILangModel } from "../interfaces/lang";

let langSchema : Schema = new Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    url: { type : String , required : true, dropDups: true },
    slug: { type : String , unique : true, required : true, dropDups: true },
    categories: {
        name: { type : String , dropDups: true },
        url: { type : String, dropDups: true }
    }
});

export const lang: Model<ILangModel> = model<ILangModel>("lang", langSchema);