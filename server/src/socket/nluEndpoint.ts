import {model, Model } from 'mongoose';
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
import _ from "lodash";
import {agent} from "../schemas/nlu";

class nluEndpoint {
    ModelIntent_: Model<IIntentModel>;
    ModelAgent_: Model<IAgentModel>;
    ModelSimpleEntity_: Model<IEntityModel>;
    ModelSynonymEntity_: Model<IEntitySynonymsModel>;
    ModelRegexpEntity_: Model<IEntityRegexpModel>;
    ModelLookupEntity_: Model<IEntityLookupModel>;

    constructor () {
        this.ModelAgent_ = model('agent');
        this.ModelIntent_ = model('intent');
        this.ModelSimpleEntity_ = model('simple');
        this.ModelLookupEntity_ = model('lookup');
        this.ModelRegexpEntity_ = model('regexp');
        this.ModelSynonymEntity_ = model('synonyms');
    }

    /**
     * Create an entity.
     *
     * @param categoryId The id of category link with the new entity.
     * @param type The type of the entity (simple, regexp, lookup, synonyms)
     * @param entity The entity data (see all interfaces of nlu to see the difference between the entitie type).
     *
     * @return A promise with the save or null.
     */
     createEntity(categoryId : number,  type : TypeEntity, entity : IEntityModel) : Promise<IEntityModel> | null {
        let newEntity : IEntityModel | null = null;

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
            return newEntity.save();
        } else {
            return null;
        }
    }

    /**
     * Get the entity by the type and the category id.
     *
     * @param categoryId The id of category link with the new entity.
     * @param type The type of the entity (simple, regexp, lookup, synonyms)
     *
     * @return A promise with the result of the query.
     */
     getEntitybyTypeAndCategory(categoryId: number, type : string) {
        let query  = null;

        if(type == TypeEntity.Simple) {
            query = this.ModelSimpleEntity_.find({'categoryId' : categoryId},null,null);
        } else if(type == TypeEntity.Synonyms) {
            query = this.ModelSynonymEntity_.find({'categoryId' : categoryId},null,null);
        } else if(type == TypeEntity.Lookup) {
            query =  this.ModelLookupEntity_.find({'categoryId' : categoryId},null,null);
        } else if(type == TypeEntity.Regexp) {
            query = this.ModelRegexpEntity_.find({'categoryId' : categoryId},null,null);
        } else {
            return null;
        }

        if(query == undefined) {
            return null;
        } else {
            return query.exec().then((docs) =>{
                return docs;
            }).catch(() =>{
                return null;
            });
        }
    }

    /**
     * Get all entity the category id.
     *
     * @param categoryId The id of category link with the new entity.
     *
     * @return A promise with the result.
     */
     async getEntityByCategoryId(categoryId : number) {
        let results : any = [];
        for (let typeEntityKey in TypeEntity) {
            let entities = await this.getEntitybyTypeAndCategory(categoryId,TypeEntity[typeEntityKey]);

            if(entities !== null ) {
                results = _.concat(results, entities);
            } else {
                return null;
            }
        }
        return results;
     }

    async addAgent(categoryId : number, agent : any) : Promise<IAgentModel> {
         let newAgent = new this.ModelAgent_(agent);
         newAgent.categoryId = categoryId;
         return newAgent.save();
    }

    getAgentByCategoryId(categoryId : number) {
        let query = this.ModelAgent_.find({'categoryId' : categoryId},null,null);
        return query.exec().then((docs) =>{
            return docs;
        }).catch(() =>{
            return null;
        });
    }

    addIntent(agentId : number, intent: any) {
        let newIntent = new this.ModelIntent_(intent);
        newIntent.agentId = agentId;
        return newIntent.save();
    }

    getIntentByAgentId(agentId : number) {
        let query = this.ModelIntent_.find({'agentId' : agentId},null,null);
        return query.exec().then((docs) =>{
            return docs;
        }).catch(() =>{
            return null;
        });
    }

    trainNLU() {
        return true;
    }
}

export default new nluEndpoint()