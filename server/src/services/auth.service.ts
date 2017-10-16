'use strict';

import DatabaseService from './database.service';
import { ObjectId } from 'mongodb';

// Get a database service instance
const db = new DatabaseService();

// !!!! NOT IN USE AT THE MOMENT !!! IF THERE WILL BE MULTIPLE USERS THAN THIS SERVICE WILL BE USED !!!

export default class AuthService {
    constructor() {}

    public async findUserByEmail(email: string) {
        return await db.connection().collection('users').findOne({ email: email });
    }

    public async registerUser(email: string, password: string) {
        
    }

}
