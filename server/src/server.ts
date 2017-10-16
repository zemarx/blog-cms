'use strict';

import * as Koa from 'koa';
import { postRoutesPublic, postRoutesPrivate } from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import userRoutes from './routes/user.routes';
import config from './config/config';
import DatabaseService from './services/database.service';

const path = require('path');
const serve = require('koa-static');
const send = require('koa-send');
const cors = require('@koa/cors');
const jwt = require('koa-jwt');
const bodyparser = require('koa-bodyparser');

const databaseService = new DatabaseService();
const app = new Koa();

// let clientIndexPath = '';
//
// if (process.env.NODE_ENV === 'production') {
//     clientIndexPath = path.resolve(__dirname, './../../client/dist');
// } else if (process.env.NODE_ENV === 'development') {
//     clientIndexPath = path.resolve(__dirname, './../../client/src/dist');
// }
//
// // Set static content path
// app.use(serve(clientIndexPath));

// Setting cors
app.use(cors());

app.use(bodyparser());

// Public routes
app.use(userRoutes.routes());
app.use(postRoutesPublic.routes());
app.use(commentRoutes.routes());

// This will send the index.html page to the client if none of the api routes are called
app.use(async (ctx, next) => {
    if (ctx.url.match(/^\/api.*/)) {
        await next();
    }
    // else {
    //     await send(ctx, '/index.html', { root: clientIndexPath });
    // }
});

// Setting jwt token's checking
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // set err object's cors headers manually here, because koa strips away cors headers in case of 'throw' in koa-jwt package
        err.headers = err.headers || {};
        err.headers['Access-Control-Allow-Origin'] = '*';
        err.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,PUT,POST,DELETE';
        err.headers['Access-Control-Allow-Headers'] = 'Origin,Content-Type,Authorization';
        throw err;
    }
});

// app.use(jwt({ secret: config.jwt.secret }));

// Private routes
app.use(postRoutesPrivate.routes());


// Start the server only after connecting to the database
databaseService.connect(config.db.url).then(() => {
    // Start server only after connection to the database has been established
    app.listen(config.port, () => console.log(`Started listening on port ${config.port}`));
}).catch(err => {
    console.log(err);
});
