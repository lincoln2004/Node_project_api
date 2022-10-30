const { conf } = require('../db/models/itemModel')
const { modelResolver } = require('./Resolvers')


class itemService {

    #model

    constructor() {

        this.#model = modelResolver(conf.attr, conf.opt)

        
    }

    async list() {

        await this.#syncModel()

        return await this.#model.findAll({
            attributes: [['name', 'typeItem'],
            ['amount', 'stock'], 'id']
        })
    }

    async put(args) {

        await this.#syncModel()

        switch (args.findBy) {

            case 1: {
                const rst = await this.#model.findByPk(args.identifier)

                if (rst) {

                    rst.amount = args.change
                    await rst.save()
                }
            }
                break

            case 2: {
                const rst = await this.#model.findOne({ where: { name: args.identifier } })

                if (rst) {

                    rst.amount = args.change
                    await rst.save()
                }
            }
                break

            default:

                null
        }
    }

    async add(data){

        await this.#syncModel()

        if(data){

            data = Object.fromEntries(Object.entries(data).filter(([attr]) => attr.includes('typeItem') || attr.includes('stock')))

            await this.#model.create({ name: data.typeItem, amount: data.stock})
        }
    }

    async delete(args) {

        await this.#syncModel()

        console.log(typeof Number(args.identifier))

        if(args && args.identifier && typeof args.identifier === 'number'){

            await this.#model.destroy({ where: { id: args.identifier} })
            
        }
    }
    
    async #syncModel(){

        try{
            await this.#model.sync()
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = { itemService }
