const {Router} = require('express')
const { itemService } = require('../services/itemService')

const item = Router()

item.get('/', async (req,res) => {

    

    res.json({ list: await new itemService().list()})
})

item.post('/item/methods/add', async (req,res) => {

    if(req.body){

        const { typeItem, stock} = req.body

        await new itemService().add( {typeItem, stock} )
    }
    res.end()
})

item.post('/item/methods/put/:id', async (req,res) => {

    if(req.params){

        const { identifier} = req.params

        if(req.body){

            const { stock } = req.body

            await new itemService().put({ findBy: 1, change: stock, identifier} )
        }
    }
    res.end()
})

item.post('/item/methods/delete/:id', async (req, res) => {

    if(req.params){

        const { identifier} = req.params

        if(identifier){
            await new itemService().delete({ identifier })
        }
    }
    res.end()
})


module.exports = item