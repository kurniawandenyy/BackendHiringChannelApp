const uuidv4 =require('uuid/v4')

module.exports = {
    response : (res, status, error, message, data) => {
        let resultPrint = {}
        resultPrint.id = uuidv4()
        resultPrint.status = resultPrint.status || 200
        resultPrint.error = error || false
        resultPrint.message = message || 'Success!'
        resultPrint.data = data || {}

        return res.status(resultPrint.status).json({resultPrint})
    }
}