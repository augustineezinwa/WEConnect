# WEConnect

[![Build Status](https://travis-ci.org/augustineezinwa/WEConnect.svg?branch=ft-signup-endpoint-%23155587518)](https://travis-ci.org/augustineezinwa/WEConnect) [![Coverage Status](https://coveralls.io/repos/github/augustineezinwa/WEConnect/badge.svg?branch=ft-signup-endpoint-%23155587518)](https://coveralls.io/github/augustineezinwa/WEConnect?branch=ft-signup-endpoint-%23155587518) [![Maintainability](https://api.codeclimate.com/v1/badges/b84bdd1eb41438c74559/maintainability)](https://codeclimate.com/github/augustineezinwa/WEConnect/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b84bdd1eb41438c74559/test_coverage)](https://codeclimate.com/github/augustineezinwa/WEConnect/test_coverage)

<hr>
WeConnect provides a platform that brings businesses and individuals together. This platform
creates awareness for businesses and gives the users the ability to write reviews about the
businesses they have interacted with.
<hr>

<b>Templates is hosted live on</b> https://augustineezinwa.github.io/WEConnect/template/index.html

<b>Technology used</b>
<hr>
<ul>
  <li>Back-end: Node/Expressjs + Sequelize/Postgres (Yet be Implemented)</li>
  <li>Libraries: ES6, Babel-CLI,Babel-preset, eslint, Mocha/Chai,Express, body-parser</li>
  <li>UI: html, css, javascript, bootstrap</li>
</ul>

<h3>Installation</h3>
<hr>
<ul>
    <li>Clone or download the repo</li>
    <li><b>npm install</b> - to install the dependencies need by the app</li>
    <li><b>npm start </b>- to run the app</li>
    <li>Server is running on port 2020</li>
</ul>

### API END POINTS
<table>
<tr><th>Http verb</th><th>Endpoint</th><th>Action</th></tr>
<tr> <td>POST</td> <td> /businesses </td> <td>- Registers a new Business </td></tr>
<tr> <td>PUT</td> <td>/businesses/:businessId </td><td>-Updates a business</td></tr>
<tr> <td>DELETE</td><td> /businesses/:businessId </td><td>- Deletes a business</td></tr>
<tr><td> POST </td><td>/businesses/:businessId/review/</td><td> - Adds review for a particular business</td></tr>
<tr> <td>GET </td><td>/businesses/:businessId/review/</td><td> - Gets review for a particular business</td><tr>
<tr><td>GET </td><td>/businesses </td><td>- Gets all businesses</td></tr>
<tr> <td>GET</td> <td>/businesses/:businessId</td><td> - Gets details of a single business</td></tr>
<tr><td> POST </td><td>/auth/signup </td><td>- Creates a new user</td></tr>
<tr><td> POST </td><td>/auth/login </td><td>- Signs in a new user</td></tr>
</table>
<i>Project still in progress</i>
