'use strict';

import { MongoClient } from 'mongodb';

let db_con;

// Class for handling database connection with mongodb database
class DatabaseService {
    constructor() {}

    public async connect (db_url: string) {
         db_con = await MongoClient.connect(db_url);
    }

    // Returns a connection to the database
    // This way the connection to the database can be reused
    public connection () {
        return db_con;
    }
}

export default DatabaseService;
