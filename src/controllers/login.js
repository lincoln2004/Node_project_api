const { Router } = require('express')
const { loginFilter } = require('../services/filterService')

const login = Router()

login.post('/login', async (req,res) =>{

    if(req.body){

        const body = Object.fromEntries(Object.entries(req.body).filter(([el]) => el.includes('username') | el.includes('pwssd')))

        await new loginFilter(body).sessionResolver(req)

        console.log(req.session.tk_auth_sec)
        if(req.session.tk_auth_sec){
            
            res.redirect('/')
        }
        else{
            console.log('ops')
            res.redirect('/login?unauthorized=true')
        }
    }
})

login.get('/login', (req,res) => {

    if(req.query){
        if(req.query.unauthorized){
            res.json({msg: "you can't to access here, credentials unknown..."})
            res.end()
        }

        if(req.query.credentials){
            res.json({msg: "credentials not found..."})
            res.end()
        }
    }
})

login.get('/logout', (req,res) => {

    if(req.session){

        req.session.destroy()
    }

    res.json({"msg":"logout user done..."})
})

module.exports = login