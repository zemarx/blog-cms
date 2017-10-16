'use strict';

// import { sanitize } from 'sanitize-html';
import DatabaseService from './database.service';
import { ObjectId } from 'mongodb';
import buildTree from '../utils/buildCommentTree';

const dbService = new DatabaseService();

export default class CommentService {
    constructor() {}

    // Get all comments of a post with 'post_id'
    public async getPostComments(post_id: string) {
        let comments = await dbService
            .connection()
            .collection('comments')
            .find({ post_id: new ObjectId(post_id) })
            .toArray();

        // Create a json tree object from adjacent list of comments
        let commentTree = buildTree(comments);

        return JSON.stringify(commentTree);
    }

    // Add new comment to a particular post
    public async addNewComment(comment) {
        let post_id = (comment.post_id);
        let parent_id = (comment.parent_id);
        let author_name = (comment.author_name);
        let content = (comment.content);

        let results = await dbService
            .connection()
            .collection('comments')
            .insert({
                _id: new ObjectId(),
                post_id: (post_id !== '' && post_id !== null && post_id !== 'null') ? new ObjectId(post_id) : null,
                parent_id: (parent_id === '' || parent_id === null || parent_id === 'null') ? null : parent_id,
                author_name: author_name,
                content: content,
                date_created: new Date(),
                children: []
            });

        return results.ops[0];
    }

    public async updateComment(id: string) {
        console.log('Update post with id: ' + id);
        console.log('Not implemented yet :(');
    }

    public async deleteComment(id: string) {
        console.log('Delete post with id: ' + id);
        console.log('Not implemented yet :(');
    }
}
