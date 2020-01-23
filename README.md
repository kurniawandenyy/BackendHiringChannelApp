# Backend Hiring Channel App

## Table of contents
* [General info](#general-info)
* [Built With](#built-with)
* [Requirements](#requirements)
* [Setup](#setup)
* [End Point](#end-point)
* [Contact](#contact)
* [Contributors](#contributors)

## General info
this project is a backend for the hiring channel app, created to connect companies with job seekers. Built with NodeJs using the ExpressJs Framework. Express.js is a web application framework for Node.js. [More about ExpressJs](https://en.wikipedia.org/wiki/Express.js)
	
## Built With
Project is created with:

[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)

## Requirements
1. <a href="https://nodejs.org/en/">NodeJs</a>
2. <a href="https://www.getpostman.com/">Postman</a> for API testing
3. Web Server (ex. localhost)

## Setup
Steps to run this project:

 - Create new database
 - Import [hiring_channel.sql](https://github.com/kurniawandenyy/BackendHiringChannelApp/blob/master/hiring_channel.sql) file to your new database
 - Rename .env.example file to .env
 - Edit the .env file and enter your database settings
 - Open terminal and go to your apps directory
 - run ```npm install```
 - then run ```npm start```




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

## Contact

If you want to contact me you can reach me at <denykurniawan146@gmail.com>.

## Contributors

<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/kurniawandenyy">
          <img width="100" src="https://avatars1.githubusercontent.com/u/48039021?s=460&v=4" alt="Deny Kurniawan"><br/>
          <sub><b>Deny Kurniawan</b></sub>
        </a>
      </td>
    </tr>
  </table>
</center>
