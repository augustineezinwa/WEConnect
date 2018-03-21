# WEConnect

[![Build Status](https://travis-ci.org/augustineezinwa/WEConnect.svg?branch=ft-signup-endpoint-%23155587518)](https://travis-ci.org/augustineezinwa/WEConnect) [![Coverage Status](https://coveralls.io/repos/github/augustineezinwa/WEConnect/badge.svg?branch=ft-signup-endpoint-%23155587518)](https://coveralls.io/github/augustineezinwa/WEConnect?branch=ft-signup-endpoint-%23155587518) [![Maintainability](https://api.codeclimate.com/v1/badges/b84bdd1eb41438c74559/maintainability)](https://codeclimate.com/github/augustineezinwa/WEConnect/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b84bdd1eb41438c74559/test_coverage)](https://codeclimate.com/github/augustineezinwa/WEConnect/test_coverage)

## Application - Description
WeConnect provides a platform that brings businesses and individuals together. This platform
creates awareness for businesses and gives the users the ability to write reviews about the
businesses they have interacted with.
<b>Templates is hosted live on</b> https://augustineezinwa.github.io/WEConnect/template/index.html

## Table of Content

* [Features](#features)
* [Technology](#technology)
* [Installation](#installation)
* [Testing](#testing)
* [API End Points](#api-end-points)

## Features
WEConnect consist of the following features:
###  Users
* Users can register into WEConnect
* Users can log into WEConnect
* Users can view all businesses in WEConnect
* Users can search for any business in WEConnect
* User can choose to search for any business by category in WEConnect
* Users can choose to search for any business by location in WEConnect
* Users can choose to write a review for any business in WEConnect
* Users can register businesses in WEConnect
* Users can update their businesses in WEConnect
* Users can delete their businesses in WEConnect

## Technology

**WEConnect** makes use of modern technologies. The core ones are:

* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
    See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
    see [this link](https://en.wikipedia.org/wiki/Express.js).
* Postgresql & Sequelize: Postgresql is an advanced open source Object-Relational Model (ORM) database.Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* Major codes are written using the Airbnb javascript style guide, see [this link](https://github.com/airbnb/javascript) for details.

## Installation
1. Clone the repository:
```
https://github.com/augustineezinwa/WEConnect
```
2. Navigate into the cloned repository:
```
cd WEConnect
```
3. Install dependencies.
```
npm install
```
4. Start the application
```
npm start
```
5. Install postman to test all endpoints

## Testing
- to test run `npm test`

## API End Points
<table>
<tr><th>Http verb</th><th>Endpoint</th><th>Action</th></tr>
<tr> <td>POST</td> <td> /businesses </td> <td>Registers a new Business </td></tr>
<tr> <td>PUT</td> <td>/businesses/:businessId </td><td>Updates a business</td></tr>
<tr> <td>DELETE</td><td> /businesses/:businessId </td><td> Deletes a business</td></tr>
<tr><td> POST </td><td>/businesses/:businessId/review/</td><td>  Adds review for a particular business</td></tr>
<tr> <td>GET </td><td>/businesses/:businessId/review/</td><td> Gets review for a particular business</td><tr>
<tr><td>GET </td><td>/businesses </td><td> Gets all businesses</td></tr>
<tr> <td>GET</td> <td>/businesses/:businessId</td><td> Gets details of a single business</td></tr>
<tr><td> POST </td><td>/auth/signup </td><td> Creates a new user</td></tr>
<tr><td> POST </td><td>/auth/login </td><td> Signs in a new user</td></tr>
</table>

<i>Project still in progress</i>
