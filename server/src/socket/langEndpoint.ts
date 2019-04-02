import { model, Model } from 'mongoose'
import { ILangModel, ICategory } from '../interfaces/lang'
import { Socket } from 'socket.io'

class LangEndpoint {
    Model_ : Model<ILangModel>;

    constructor () {
      this.Model_ = model('lang')
    }

    /** Add a language in the database.
     *
     * @param lang ILangModel The language represents by the name and the url.
     * @param socket Use to pass a sucess message.
     * @return True if success.
     */
    addLang (lang: ILangModel, socket: Socket): void {
      let newLang = new this.Model_(lang)
      newLang.slug = newLang.name.toLowerCase()
      newLang.save(err => {
        if (err) {
          console.error('Problem with the creation of the new_lang')
          console.error(err)
        }

        socket.emit('success', !err)
        this.getLangs(socket)
      })
    }

    /** Get a language in the database.
     *
     * @return all langs.
     */
    getLangs (socket : Socket) : void {
      this.Model_.find({}, function (err, langs) {
        socket.emit('get lang', langs)
      })
    }

    /**
     * TODO add an error when the category is not set.
     */
    addCategory (socket: Socket, id : Number, category: ICategory) {
      console.log(category)
      console.log(id)
      this.Model_.findOne({ _id: id }, (err, lang : ILangModel) => {
        category.slug = category.name.toLowerCase()

        if (lang.categories) { lang.categories.push(category) } else { lang.categories = [category] }
        lang.save().then(() => {
          this.getLangs(socket)
        })
        socket.emit('success', !err)
      })
    }
}

export default new LangEndpoint()
