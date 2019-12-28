'use strict'
const express = require('express')
const Route = express.Router()

const authCheck = require('../helpers/authCheck')
const company = require('../controllers/companies')

Route
    //company routes
    .get('/', company.getCompanies)
    .get('/:id', company.getCompany)
    .post('/', authCheck.companyCheck, company.addCompany)
    .put('/:id', authCheck.companyCheck, company.editCompany)
    .delete('/:id', authCheck.companyCheck, company.deleteCompany)

module.exports=Route