'use strict'
const express = require('express')
const Route = express.Router()

const authCheck = require('../helpers/authCheck')
const company = require('../controllers/companyController')

Route
    //company routes
    .get('/', company.getCompanies)
    .post('/', authCheck.companyCheck, company.addCompany)
    .put('/:id', authCheck.companyCheck, company.editCompany)
    .delete('/:id', authCheck.companyCheck, company.deleteCompany)

module.exports=Route