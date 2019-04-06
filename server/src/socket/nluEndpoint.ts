import {model, Model} from 'mongoose';
import {
    IAgentModel,
    IEntityLookupModel,
    IEntityModel,
    IEntityRegexpModel,
    IEntitySynonymsModel,
    IIntentModel,
    TypeEntity
} from '../interfaces/nlu';
import {Socket} from "socket.io";

class nluEndpoint {
    ModelIntent_: Model<IIntentModel>;
    ModelAgent_: Model<IAgentModel>;
    ModelSimpleEntity_: Model<IEntityModel>;
    ModelSynonymEntity_: Model<IEntitySynonymsModel>;
    ModelRegexpEntity_: Model<IEntityRegexpModel>;
    ModelLookupEntity_: Model<IEntityLookupModel>

    constructor () {
        this.ModelAgent_ = model('agent');
        this.ModelIntent_ = model('intent');
        this.ModelSimpleEntity_ = model('simple');
        this.ModelLookupEntity_ = model('lookup');
        this.ModelRegexpEntity_ = model('regexp');
        this.ModelSynonymEntity_ = model('synonyms');
    }

    /**
     *
     * @param socket The Socket
     * @param categoryId The id of category link with the new entity.
     * @param type The type of the entity (simple, regexp, lookup, synonyms)
     * @param entity The entity data (see all interfaces of nlu to see the difference between the entitie type).
     */
    createEntity(socket : Socket, categoryId : number,  type : TypeEntity, entity : IEntityModel) {
        let newEntity = null;

        if(type == TypeEntity.Simple) {
            newEntity = new this.ModelSimpleEntity_ (entity);
        } else if(type == TypeEntity.Synonyms) {
            newEntity = new this.ModelSynonymEntity_(entity);
        } else if(type == TypeEntity.Lookup) {
            newEntity = new this.ModelLookupEntity_(entity);
        } else if(type == TypeEntity.Regexp) {
            newEntity = new this.ModelRegexpEntity_(entity);
        }

        if(newEntity !== null){
            newEntity.categoryId = categoryId;
            newEntity.save((err) => {
                // TODO : Send something
            });
        }
    }
}

export default new nluEndpoint()