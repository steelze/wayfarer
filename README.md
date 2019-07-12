# Wayfarer [![Build Status](https://travis-ci.com/Steelze/wayfarer.svg?branch=develop)](https://travis-ci.com/Steelze/wayfarer) [![Coverage Status](https://coveralls.io/repos/github/Steelze/wayfarer/badge.svg?branch=develop)](https://coveralls.io/github/Steelze/wayfarer?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/6b6d2e1e5f9101df5c1c/maintainability)](https://codeclimate.com/github/Steelze/wayfarer/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6b6d2e1e5f9101df5c1c/test_coverage)](https://codeclimate.com/github/Steelze/wayfarer/test_coverage)

## Introduction
WayFarer is a public bus transportation booking server. It allows admins to manage trips and bookings and allows users to book for a trip.

## Table of Contents
1. <a href="#live-application">Live Application</a>
2. <a href="#technology-stack">Technology Stack</a>
3. <a href="#api-documentation">API Documentation</a>
4. <a href="#application-features">Application Features</a>
5. <a href="#api-endpoints">API Endpoints</a>
6. <a href="#setup">Setup</a>
7. <a href="#author">Author</a>
8. <a href="#license">License</a>


## Live Application
* [Wayfarer1000](https://wayfarer1000.herokuapp.com/api/v1)

## Technology Stack
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Express-Validator](https://www.npmjs.com/package/express-validator)
  - [Babel](https://babeljs.io) 
  - [Eslint](https://eslint.org/)
  - [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) - - [style guide](https://github.com/airbnb/javascript)
  ### Testing tools
   - Javascript test framework - [Mocha](https://mochajs.org/)
   - Assertion library - [Chai](http://chaijs.com)
   - Reporting tool - [nyc](https://github.com/istanbuljs/nyc)
  ### Project Management Tool
   [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2358943)

## API Documentation
[API Documentation](https://wayfarer1000.herokuapp.com/api-docs)

## Application Features
* User can signup and signin
* Admin can add and view buses
* Admin can create a trip
* Admin and users can view all trips
* User can filter trips
* Admin can cancel a trip
* Users can book a seat on a trip
* Users can specify seat number or system generates one
* Users can view own bookings
* Users can delete their booking
* Admin can see all bookings


## API Endpoints
Method | Route | Description
--- | --- | ---
`POST` | `/api/v1/auth/signup` | Create a user
`POST` | `/api/v1/auth/signin` | Login an already registered user
`GET` | `/api/v1/buses` | View all buses
`POST` | `/api/v1/buses` | Create a bus
`GET` | `/api/v1/trips` | View all trips
`POST` | `/api/v1/trips` | Create a trip
`PATCH` | `/api/v1/trips/:id` | Cancel a selected trip
`GET` | `/api/v1/trips/search` | Filter trips
`GET` | `/api/v1/bookings` | View all bookings or my bookings
`POST` | `/api/v1/bookings` | Book a seat on a trip
`DELETE` | `/api/v1/bookings/:id` | Deletes a booking

## Setup
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

  ### Dependencies
  - [Node.js](https://nodejs.org/)
  - [PostgreSQL](https://www.postgresql.org/)
 
  ### Getting Started
  - Install node.js
  - Setup PostgreSQL
  - Open terminal and run the following commands
    ```
    $ git clone https://github.com/Steelze/wayfarer.git
    $ cd wayfarer
    $ git checkout develop
    $ npm install
    ```
  - Duplicate and save .env.example as .env and fill in environment variables

  ### Run The Service
  ```
  $ npm run start-dev
  ```

  ### Testing
  ```
  $ npm test
  ```
  If correctly setup, all tests should pass
  
## Author
Odunayo Ileri Ogungbure

## License
ISC
