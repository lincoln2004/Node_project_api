const { secureClass } = require('./secureService')
const { cryptService } = require('./secureService')

class filterService {

    static async authFilter(req, next) {

        let session = req.session.tk_auth_sec || null

        if(!session){
            req.credError = { type: 'authError' }

            return next()
        }

        let data = Object.assign(session, { iv: Buffer.from(session.iv.data), tag: Buffer.from(session.tag.data)})
        data = JSON.parse(cryptService.decipher(req.session.tk_auth_sec)) || null

        const body =  data ? { identifier: data.identifier , username: data.username} : false


        if (await new secureClass().authfinder(body)) {
            next()
        }
        else {

            req.credError = { type: 'authError' }

            next()
        }
    }



}

class loginFilter {

    #body
    constructor(creds) {

        this.#body = this.#loginFilter(creds)

    }

    async #loginFilter(creds) {

        if (creds && typeof creds === 'object') {

            creds = Object.fromEntries(Object.entries(creds).filter(([cred]) => cred.includes('username') | cred.includes('pwssd')))

            const tmp = await new secureClass().login(creds.username, creds.pwssd)

            if (tmp && typeof tmp === 'object') {
                return tmp
            }
        }

        return null
    }

    async sessionResolver(req) {

        if (this.#body) {

            req.session.tk_auth_sec = cryptService.cipher(JSON.stringify(await this.#body))
            req.session.save()
        }

    }
}

module.exports = { filterService, loginFilter }