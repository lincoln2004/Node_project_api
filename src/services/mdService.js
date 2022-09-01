const { filterService } = require('./filterService')

class middlewareClass {

    static auth(req, res, next) {

        if (req.session) {

            console.log(req.session)
            filterService.authFilter(req, next)
        }
        else {
            req.credError = { type: 'credentialsNull'}
            next()
        }
    }

    static errorAuthHandler(req, res, next) {

        if (req.credError) {

            if (req.credError.type === 'authError') {

                delete req.credError

                res.redirect('/login?unauthorized=true')
                res.end()
            }
            else if (req.credError.type === 'credentialsNull') {

                delete req.credError

                res.redirect('/login?credentials=false')
                res.end()
            }

        }
        else{
            next()
        }

    }
}


module.exports = { middlewareClass }