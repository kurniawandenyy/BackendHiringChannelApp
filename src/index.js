const express = require('express')
const Route = express.Router()

const engineers = require('./routes/engineers')
const companies = require('./routes/companies')
const auth = require('./routes/auth')
const messages = require('./routes/messages')

Route
    .use('/api/v1/engineers', engineers)
    .use('/api/v1/companies', companies)
    .use('/api/v1/messages', messages)
    .use('/auth', auth)


module.exports = Route