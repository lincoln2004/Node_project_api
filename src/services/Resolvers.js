const session = require("express-session");
const InstanceStore = require('connect-redis')(session)
const redis = require('ioredis')
const { Model } = require('sequelize')

class sessionResolver {


    constructor(app, opt) {

        let options = Object.assign({}, opt, { store: new InstanceStore({ client: new redis(6001) }) })

        this.#resolver(app, options)
    }

    #resolver(app, opt) {


        app.use(session(opt))
    }
}

class controllerResolver {

    constructor(app, controller) {

        this.#resolver(app, controller)
    }


    #resolver(app, controller) {

        app.use(controller)
    }
}

function modelResolver(fields, opts) {


    class modelTemplate extends Model { }

    return modelTemplate.init(fields, opts)
}

module.exports = { sessionResolver, controllerResolver, modelResolver }