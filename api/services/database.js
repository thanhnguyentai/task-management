import mongoose from 'mongoose';
import config from 'config';

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        return mongoose.connect('mongodb://'+config.get('databaseConnection'), {
            useCreateIndex: true,
            useNewUrlParser: true
        }).then(()=> {
            console.log('Database connection successful');
        })
        .catch(err => {
            console.log('Database connection error');
        });
    }
}

export default new Database;

