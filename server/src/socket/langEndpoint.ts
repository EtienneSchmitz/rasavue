import { model, Model } from "mongoose";
import { ILangModel } from "../interfaces/lang";

class LangEndpoint {
    model_ :  Model<ILangModel>;

    constructor() {
        this.model_ = model('lang')
    }

    /** Add a language in the database.
     *
     * @param lang ILangModel The language represents by the name and the url.
     * @return True if success.
     */
    add_lang(lang: ILangModel) {
        if(lang.name != "" && lang.url != "") {
            let new_lang = new this.model_(lang);
            new_lang.slug = new_lang.name.toLowerCase();
            new_lang.save((err => {
                if(err) {
                    console.error("Problem with the creation of the new_lang");
                    console.error(err);
                }
                return !err;
            }));
        }
    }
}

export default new LangEndpoint();
