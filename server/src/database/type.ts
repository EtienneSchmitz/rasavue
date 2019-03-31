import {Db} from "mongodb";

export default class Type {
    database : Db;

    constructor(database : Db) {
        this.database = database;
    }

    read_langs() : any {

    }

    read_categories(lang: any) {

    }

    add_lang(lang : any) {

    }

    add_category(lang_id : number, category : any){

    }

    update_lang(lang: any)  {

    }

    update_category(lang_id : number, category : any) {

    }

    delete_lang(lang_id : number) {

    }

    delete_category(lang_id : number, category_id : number) {

    }
};

