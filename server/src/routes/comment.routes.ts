'use strict';

import * as Router from 'koa-router';
import CommentService from './../services/comment.service';

const commentService = new CommentService();
const router = new Router({ prefix: '/api'});

// Get all comments for particular post(post id comes in url params)
router.get('/comments', async (ctx, next) => {
    try {
        ctx.body = await commentService.getPostComments(ctx.query.post_id);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Add one comment for particular post(post id comes in url params)
router.post('/comments', async (ctx, next) => {
    try {
        ctx.body = await commentService.addNewComment(ctx.request.body.comment);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

// Delete comment by id
router.delete('/comments/:_id', async (ctx, next) => {
    try {
        ctx.body = commentService.deleteComment(ctx.params._id);
    } catch (err) {
        // TODO: send error object to client
        console.log(err);
    }
});

export default router;
