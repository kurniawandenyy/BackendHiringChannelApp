const express = require('express')
const Route = express.Router()

const routes = require('./routes/routes')

Route
    .use('/', routes)

module.exports = Route