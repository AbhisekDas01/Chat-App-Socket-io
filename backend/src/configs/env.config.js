import {config} from 'dotenv'

config({path: '.env'});

export const  {
    PORT,
    MONGODB_URI,
    NODE_ENV,
    JWT_SECRET,
    RESEND_API_KEY,
    EMAIL_FROM,
    EMAIL_FROM_NAME,
    CLIENT_URL

} = process.env;