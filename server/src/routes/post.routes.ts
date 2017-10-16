'use strict';

import * as Router from 'koa-router';
import PostService from '../services/post.service';

const postService = new PostService();
const postRoutesPrivate = new Router({ prefix: '/api/private'});
const postRoutesPublic = new Router({ prefix: '/api/public'});


// GET:    http://localhost:3000/api/posts       ---> Get all posts
// POST:   http://localhost:3000/api/posts       ---> Add one post
// PUT:    http://localhost:3000/api/posts/:_id  ---> Update one post by id
// GET:    http://localhost:3000/api/posts/:_id  ---> Get one post by id
// DELETE: http://localhost:3000/api/posts/:_id  ---> Delete one post by id


//------------------------- PUBLIC ROUTES -----------------------------------

// Get all posts
// Returns object "posts" of type array with all the posts
postRoutesPublic.get('/posts', async (ctx, next) => {
    try {
        ctx.body = await postService.getAllPosts();
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Get one post by id
postRoutesPublic.get('/posts/:_id', async (ctx, next) => {
    try {
        ctx.body = await postService.getPost(ctx.params._id);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});



//------------------------- PRIVATE ROUTES -----------------------------------

// Get all posts
// Returns object "posts" of type array with all the posts
postRoutesPrivate.get('/posts', async (ctx, next) => {
    try {
        ctx.body = await postService.getAllPosts();
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Add new post
// Retuns created post in response
postRoutesPrivate.post('/posts', async (ctx, next) => {
    try {
        ctx.body = await postService.addNewPost(ctx.request.body);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Update post
postRoutesPrivate.put('/posts/:_id', async (ctx, next) => {
    try {
        ctx.body = await postService.updatePost(ctx.params._id, ctx.request.body);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});



// Delete one post by id
postRoutesPrivate.delete('/posts/:_id', async (ctx, next) => {
    try {
        ctx.body = await postService.deletePost(ctx.params._id);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

export {
    postRoutesPrivate,
    postRoutesPublic
}
