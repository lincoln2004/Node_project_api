const { cryptService } = require('../services/secureService')




function test() {

    try {
        let msg = 'message test 1'
        let msg2 = JSON.stringify({ msg: 'message test 2', hello: 'world' })

        let rst1 = cryptService.cipher(msg)
        let rst2 = cryptService.cipher(msg2)

        console.log('test1: ', cryptService.decipher(rst1))
        console.log('test2: ', cryptService.decipher(rst2))
        return
    } catch (error) {
         console.log(error)
         return 
    }
}

test()