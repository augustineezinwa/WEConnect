# WEConnect

[![Build Status](https://travis-ci.org/augustineezinwa/WEConnect.svg?branch=ft-signup-endpoint-%23155587518)](https://travis-ci.org/augustineezinwa/WEConnect) [![Coverage Status](https://coveralls.io/repos/github/augustineezinwa/WEConnect/badge.svg?branch=ft-signup-endpoint-%23155587518)](https://coveralls.io/github/augustineezinwa/WEConnect?branch=ft-signup-endpoint-%23155587518) [![Maintainability](https://api.codeclimate.com/v1/badges/b84bdd1eb41438c74559/maintainability)](https://codeclimate.com/github/augustineezinwa/WEConnect/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b84bdd1eb41438c74559/test_coverage)](https://codeclimate.com/github/augustineezinwa/WEConnect/test_coverage)


<h2>WeConnect provides a platform that brings businesses and individuals together. This platform
creates awareness for businesses and gives the users the ability to write reviews about the
businesses they have interacted with.</h2>

<b>UI template is hosted live on </b>https://augustineezinwa.github.io/WEConnect/template

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Back-end: Node/Expressjs + Sequelize/Postgres (Yet be Implemented)</li>
  <li>Libraries: ES6, Babel-CLI,Babel-preset, eslint, Mocha/Chai,Express, body-parser</li>
  <li>UI: html, css, javascript, bootstrap</li>
</ul>

<h3>App Usage</h3>
<ul>
    <li>Clone or download the repo</li>
    <li>npm install - to install the dependencies need by the app</li>
    <li>npm start - to run the app</li>
    <li>Server is running on port 2020</li>
</ul>

### Routes
- **POST** http://localhost:2020/api/v1/businesses - Registers a new Business
- **PUT** http://localhost:2020/api/v1/businesses/:businessId -Updates a business
- **DELETE** http://localhost:2020/api/v1/businesses/:businessId - Deletes a business
- **POST** http://localhost:2020/api/v1/businesses/:businessId/review/ - Adds review for a particular business
- **GET** http://localhost:2020/api/v1/businesses/:businessId/review/ - Gets review for a particular business
- **GET** http://localhost:2020/api/v1/businesses - Gets all businesses
- **GET** http://localhost:2020/api/v1/businesses/:businessId - Gets details of a single business
- **POST** http://localhost:2020/api/v1/auth/signup - Creates a new user
- **POST** http://localhost:2020/api/v1/auth/login - Signs in a new user

<i>Project still in progress</i>