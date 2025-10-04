import {config} from 'dotenv'

config({path: '.env'});

export const {
    PORT,
    MONGODB_URI,
    NODE_ENV

} = process.env;