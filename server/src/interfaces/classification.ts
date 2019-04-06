import { Document } from 'mongoose';

export interface ILangModel extends Document {
  name: String;
  url: String;
  slug?: String;
  categories?: [number]; // Use for the database Model to save categories (by Id)
  categoryItem?: [ICategoryModel]; // Use to send all categories in the user.
}

export interface ICategoryModel extends Document {
  lang_id: number;
  name: String;
  description: String;
  slug: String;
}
