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
     * @param socket The Socket
     * @param categoryId The id of category link with the new entity.
     * @param type The type of the entity (simple, regexp, lookup, synonyms)
     * @param entity The entity data (see all interfaces of nlu to see the difference between the entitie type).
     */
    createEntity(socket : Socket, categoryId : number,  type : TypeEntity, entity : IEntityModel) {
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
            newEntity.save((err) => {
                socket.emit('success', "Entity saved in the database");
            });
        } else {
            socket.emit('error', "Type is not good");
        }
    }

    /**
     * Get the entity by the type and the category id.
     *
     * @param socket The Socket
     * @param categoryId The id of category link with the new entity.
     * @param type The type of the entity (simple, regexp, lookup, synonyms)
     *
     * @send Send the socket category get category;
     */
    async getEntitybyTypeAndCategory(socket : Socket, categoryId: number, type : string) {
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
            socket.emit('error', "Type is not good");
        }

        if(query == undefined) {
            return null;
        } else {
            let entities;
            var promise = query.exec();
            return await promise.then( (docs) => {
               return docs;
            });
        }
    }

    async getEntityByCategoryId(socket : Socket, categoryId : number) {
        let results : any = [];
        for (let typeEntityKey in TypeEntity) {
            let entities = await this.getEntitybyTypeAndCategory(socket, categoryId,TypeEntity[typeEntityKey]);
            if(entities !== null ) {
                //console.log(entities)
                results = _.concat(results,entities);

            }
        }
        socket.emit('receive entity', results);
    }

    addAgent(socket : Socket, categoryId : number, data : any) {

    }

    getAgentByCategoryId(socket : Socket, categoryId : number) {

    }

    addIntent(socket : Socket, agentId : number, data: any) {

    }

    getIntentByAgentId(socket : Socket, agentId : number) {

    }

    trainNLU(socket : Socket) {

    }
}

export default new nluEndpoint()