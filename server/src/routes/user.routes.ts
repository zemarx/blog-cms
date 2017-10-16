'use strict';

import * as Router from 'koa-router';
import config from './../config/config';

const jwt = require('jsonwebtoken');
const router = new Router({ prefix: '/api'});

// Attempt to login user
router.post('/login', async (ctx, next) => {
    console.log('Requested login');

    //----------------VERIFYING JWT TOKEN------------------------------------
    // try {
    //    var decoded = jwt.verify(config.jwt.testtoken, config.jwt.secret);
    //    console.log('JWT verified: ' + JSON.stringify(decoded, null, 2));
    // } catch(err) {
    //     console.log('Verifying failed');
    // }
    //----------------------------------------------------

    let email = ctx.request.body.email; // get email // TODO: sanitize!!!
    let password = ctx.request.body.password; // get password // TODO: sanitize!!!

    // let user = await authService.findUserByEmail(email);

    // IN THE FUTURE 'PASSWORD' ISN'T STORED IN PLAIN TEXT, INSTEAD STORE HASHES
    // SO IN THE NEXT LINE CHECK HASHES

    console.log(email);
    console.log(password);

    // static email and password for now
    // if (email === 'root' && password === 'toor') {
        // generate jwt token
        const token = jwt.sign({ data: 'test_data'}, config.jwt.secret, { expiresIn: '10h' }); // token expires in 10 hours

        // send token as response
        ctx.body = {
            'status': 200,
            'message': 'Authentication succeeded',
            'token': token
        }
    // } else {
    //     ctx.body = JSON.stringify({
    //         'status': 401,
    //         'message': 'Authentication failed'
    //     });
    // }
});

// Register/create new user
router.post('/register', async (ctx, next) => {

    let email = ctx.request.body.email;
    let password = ctx.request.body.password;

    // check database if email is not taken

    // generate hash from password

    // store email and hashed password in the database

    // also store additional info(role, permissions)

    // send response if register was successfull

});

export default router;
