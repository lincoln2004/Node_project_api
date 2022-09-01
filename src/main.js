const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { middlewareClass } = require('./services/mdService')
const { sessionResolver, controllerResolver } = require('./services/Resolvers')
const itemRoutes = require('./controllers/item')
const authRoutes = require('./controllers/login')

require('dotenv').config()

const app = express()

let opt = {
    name: 'tk_auth_sec',
    secret: process.env.SS_K_SEC,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: process.env.SS_TIME_MILI
    },
    saveUninitialized: false
}

app.use(cookieParser())
new sessionResolver(app, opt)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(helmet())
app.use(cors())


new controllerResolver(app, authRoutes)

app.use(middlewareClass.auth, middlewareClass.errorAuthHandler)
new controllerResolver(app, itemRoutes)




app.listen(3000, () => console.log('server listening in port: 3000'))