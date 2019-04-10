import { model, Model } from 'mongoose';
import { ILangModel, ICategoryModel } from '../interfaces/classification';
import { Socket } from 'socket.io';

class LangEndpoint {
  ModelLang_: Model<ILangModel>;
  ModelCategory_: Model<ICategoryModel>;

  constructor () {
    this.ModelLang_ = model('lang');
    this.ModelCategory_ = model('category');
  }

  /** Add a language in the database.
   *
   * @param lang ILangModel The language represents by the name and the url.
   * @param socket Use to pass a sucess message.
   * @return True if success.
   */
  addLang (lang: ILangModel, socket: Socket): void {
    let newLang = new this.ModelLang_(lang);
    newLang.slug = newLang.name.toLowerCase();
    newLang.save(err => {
      if (err) {
        console.error('Problem with the creation of the new_lang');
        console.error(err);
      }

      socket.emit('success', !err);
      this.getLangs(socket);
    });
  }

  /** Get a language in the database.
   *
   * @return all langs.
   */
  getLangs (socket: Socket): void {
    this.ModelLang_.aggregate(
      [
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categoryItem'
          }
        }
      ],
      function (err: Error, lang: [ILangModel]) {
        if (!err) {
          socket.emit('get lang', lang);
        }
      }
    );
  }

  getAllCategory() {
    let query = this.ModelCategory_.find();

    return query.exec().then((categories) =>{
      return categories;
    }).catch(() =>{
      return null;
  });
  }

  addCategory (socket: Socket, id: Number, category: ICategoryModel) {
    this.ModelLang_.findOne({ _id: id }, (err, lang: ILangModel) => {
      if (err) {
        return;
      }
      category.slug = category.name.toLowerCase();
      category.lang_id = lang._id;

      let newCategory = new this.ModelCategory_(category);

      newCategory.save().then(() => {
        if (lang.categories) lang.categories.push(newCategory._id);
        else lang.categories = [newCategory._id];

        lang.save().then(() => {
          newCategory.save().then(() => {
            this.getLangs(socket);
          });

          socket.emit('success', !err);
        });
      });
    });
  }
}

export default new LangEndpoint();
