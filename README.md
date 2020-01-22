# Backend Hiring Channel App

## Table of contents
* [General info](#general-info)
* [Built With](#built-with)
* [Requirements](#requirements)
* [Setup](#setup)
* [End Point](#end-point)

## General info
this project is a backend for the hiring channel app, created to connect companies with job seekers. Built with NodeJs using the ExpressJs Framework. Express.js is a web application framework for Node.js. [More about ExpressJs](https://en.wikipedia.org/wiki/Express.js)
	
## Built With
Project is created with:

[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## Setup
Steps to run this project:

```
* create new database
* import hiring_channel.sql file to your new database
* Rename .env.example file to .env
* edit the .env file and enter your database settings
* $ npm install
* $ npm start
```

## End Point

```
1. Get
	* /api/v1/engineers/
	* /api/v1/engineers/:id
	* /api/v1/companies/
	* /api/v1/companies/:id
	* /api/v1/messages/inbox
	* /api/v1/messages/sent
	
2. Post
	* /api/v1/engineers/
	* /api/v1/companies/
	* /api/v1/messages/
	* /auth/register/
	* /auth/login/

3. Put
	* /api/v1/engineers/:id
	* /api/v1/companies/:id

4. Delete
	* /api/v1/engineers/:id
	* /api/v1/companies/:id
	
```
