<div align="center">
  <h1>API V1</h1>
  <strong>CODE BASE TYPESCRIPT</strong>
</div>
<br>

# TYPESCRIPT STARTER

## Getting Started

These instructions will help you to running this project on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You would need to have the following to start:

- A Mac or Linux machine
- Git
- node v14.18.2

### Configuration Environment Variable

Add environment variables from `.env`

```
NODE_ENV=
DB_URL=
PORT=
VERSION_API=
```

### Installing

The steps will be run to get a development environment in first time.

1. Install Package

```
npm install
```

2. Run application for current environment

```
npm run start:dev
```

Accesss [http://localhost:4000/brand](http://localhost:3000/brand) to display the sample

## Deployment

The steps will be run to deploy this service on a live system

1. Staging

```
npm run start:staging
```

2. Production

```
npm run start:production
```

### Dependencies Packages

- [bcryptjs](https://www.npmjs.com/package/bcryptjs) Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.
- [compression](https://www.npmjs.com/package/compression) Node.js compression middleware.
- [cors](https://www.npmjs.com/package/cors) CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [dotenv](https://www.npmjs.com/package/dotenv) Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
- [express](https://www.npmjs.com/package/express) Fast, unopinionated, minimalist web framework for node.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
- [joi](https://www.npmjs.com/package/joi) Object schema description language and validator for JavaScript objects.
- [helmet](https://www.npmjs.com/package/helmet) Helmet helps you secure your Express apps by setting various HTTP headers.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) This was developed against draft-ietf-oauth-json-web-token-08. It makes use of node-jws
- [mongoose](https://www.npmjs.com/package/mongoose) Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
- [morgan](https://www.npmjs.com/package/morgan) HTTP request logger middleware for node.js
- [typescript](https://www.npmjs.com/package/typescript) TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript
