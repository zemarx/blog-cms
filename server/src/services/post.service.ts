'use strict';

import DatabaseService from './database.service';
import { ObjectId } from 'mongodb';


// Get a database service instance
const db = new DatabaseService();

export default class PostService {
    constructor() {}

    // Returns an array of posts
    public async getAllPosts() {
        const posts = await db.connection().collection('posts').find({}).toArray();

        return { message: 'Posts fetched successfully', data: posts };
    }


    // Returns created post
    public async addNewPost(post) {
        if (!post.content || !post.title || !post.author_name || !post.status) {
            return;
        }

        let result = await db.connection()
            .collection('posts')
            .insert({
                _id: new ObjectId(),
                author_name: post.author_name,
                title: post.title,
                status: post.status,
                content: post.content,
                tags: post.tags,
                category: post.category,
                last_time_edited: null,
                date_created: new Date(),
                likes: {
                    count: 0
                },
                comments: {
                    count: 0
                },
                views: {
                    count: 0
                }
            });

        if (result.insertedCount === 1) {
            return { message: 'Post created successfully', data: result.ops[0] }
        } else {
            return { message: 'Failed to create new post' }
        }
    }


    // Returns an updated post object and status text
    public async updatePost(id: string, post) {
        if (!post.content || !post.title || !post.author_name || !post.status) {
            return;
        }

        let result = await db.connection()
            .collection('posts')
            .findOneAndUpdate(
                {
                    _id: new ObjectId(id)
                },
                {
                    $set: {
                        content: post.content,
                        title: post.title,
                        author_name: post.author_name,
                        status: post.status,
                        tags: post.tags,
                        category: post.category,
                        last_time_edited: new Date()
                    }
                });

        if (result.ok === 1) {
            return { message: 'Updated post successfully', data: result.value };
        } else {
            return { message: 'Failed to update post' };
        }
    }

    // Returns post object
    public async getPost(id: string) {
        const post = await db.connection().collection('posts').findOne({ _id: new ObjectId(id) });

        return { data: post };
    }

    // "Delete" post and returns status text
    // "Deletion" actually will make the post archived, so that is can be later restored if necessary
    public async deletePost(id: string) {
        // let results = await db.connection().collection('posts').removeOne({ _id: new ObjectId(id) }); // obsolete method

        console.log('REMOVING POST FROM SERVICE' + id);

        let result = await db.connection()
            .collection('posts')
            .findOneAndUpdate(
                {
                    _id: new ObjectId(id)
                },
                {
                    $set: {
                        status: 'trash',
                    }
                });

        let isSuccess = result.result.n === 1;

        if (isSuccess) {
            return { message: `Deleted post with id: ${id} successfully` }
        } else {
            return { message: `Deletion of post with id:${id} failed` }
        }
    }
}
