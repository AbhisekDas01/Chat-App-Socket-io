import {Resend} from 'resend'
import { EMAIL_FROM, EMAIL_FROM_NAME, RESEND_API_KEY } from '../configs/env.config.js'

export const resendClient = new Resend(RESEND_API_KEY);

export const sender = `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`;