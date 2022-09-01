const { attr, opt } = require('../db/models/secureModel')
const { modelResolver } = require('./Resolvers')
const { createCipheriv, createDecipheriv, randomBytes } = require('crypto')

require('dotenv').config()

class secureClass {

    #model

    constructor() {

        this.#model = modelResolver(attr, opt)
    }

    async authfinder(data) {

        await this.#syncModel()

        if (data) {
            const rst = await this.#model.findByPk(data.identifier, { attributes: ['username'] })

            if (rst) {

                if (rst.username === data.username) {
                    return true
                }
            }
        }

        return false

    }

    async login(username, pwd) {

        await this.#syncModel()

        if (username && typeof username == 'string') {

            const rst = await this.#model.findOne({ where: { username: username } })

            if (rst) {
                if (this.#passwordComparator(rst.password, pwd)) {
                    return { identifier: rst.id, username: rst.username }
                }
            }
        }

        return false
    }

    #passwordComparator(pw1, pw2) {

        if (pw1 == pw2) {
            return true
        }
        else {
            return false
        }
    }

    async #syncModel() {

        try {
            await this.#model.sync()
        }
        catch (err) {
            console.log(err)
        }
    }
}


class cryptService {


    static cipher(data) {

        if (!data && typeof data !== 'string') {
            return null
        }

        let rst = {
            iv: randomBytes(12),
            tag: null,
            crypted: null
        }

        let key = Buffer.from(process.env.K_CRYPT, process.env.K_ENCODE)

        let cipher = createCipheriv(process.env.K_ALG, key, rst.iv, { authTagLength: 16 })

        let txt = cipher.update(data, 'utf8', process.env.K_ENCODE)

        txt += cipher.final(process.env.K_ENCODE)

        rst.tag = cipher.getAuthTag()

        rst.crypted = txt

        return rst

    }



    static decipher(data) {

        if (!data) {
            return null
        }

        let key = Buffer.from(process.env.K_CRYPT, process.env.K_ENCODE)

        let decode = createDecipheriv(process.env.K_ALG, key, data.iv, { authTagLength: 16 })

        decode.setAuthTag(data.tag)

        let msg = decode.update(data.crypted, process.env.K_ENCODE, 'utf8')

        try {
            decode.final('utf8')
        } catch (error) {
            console.log('decode error: ', error)
            return null
        }


        return msg

    }
}

module.exports = { secureClass, cryptService }