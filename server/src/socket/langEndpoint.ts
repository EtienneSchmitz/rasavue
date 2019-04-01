import { model, Model } from "mongoose";
import { ILangModel, ICategory } from "../interfaces/lang";
import { Socket } from "socket.io";

class LangEndpoint {
    model_ :  Model<ILangModel>;

    constructor() {
        this.model_ = model('lang')
    }

    /** Add a language in the database.
     *
     * @param lang ILangModel The language represents by the name and the url.
     * @param socket Use to pass a sucess message.
     * @return True if success.
     */
    add_lang(lang: ILangModel, socket: Socket): void {
            let new_lang = new this.model_(lang);
            new_lang.slug = new_lang.name.toLowerCase();
            new_lang.save((err => {
                if(err) {
                    console.error("Problem with the creation of the new_lang");
                    console.error(err);
                }
                
                socket.emit("success",!err);
                this.get_langs(socket);
            }));
    }

    /** Get a language in the database.
     *
     * @return all langs.
     */
    get_langs(socket : Socket) : void {
        this.model_.find({}, function(err, langs) {
            socket.emit("get lang", langs);
        });
    }

    /**
     * TODO add an error when the category is not set.
     */
    addCategory(socket: Socket, id : Number, category: ICategory) {
        console.log(category);
        console.log(id);
        this.model_.findOne({_id : id}, (err, lang : ILangModel) =>{
            category.slug = category.name.toLowerCase();;

            if(lang.categories)
                lang.categories.push(category);
            else
                lang.categories = [category];
            lang.save();
            socket.emit("success",!err);
            this.get_langs(socket);
        });
    }

}

export default new LangEndpoint();
