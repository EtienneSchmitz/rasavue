import { Document, Schema, Model, model } from 'mongoose'

let actionSchema : Schema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref : 'category'},
    name: { type: String }
});