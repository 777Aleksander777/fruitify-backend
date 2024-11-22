/**
 * contact controller
 */

import { factories } from '@strapi/strapi'
import nodemailer from 'nodemailer';

export default factories.createCoreController('api::contact.contact', ({ strapi }) => ({

    async sendMail(ctx) {

        const { title, email, message } = ctx.request.body;
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: email,
                to: process.env.GMAIL_USER,
                subject: `${title} (email: ${email})` ,
                text: message,
            })

            ctx.send({ success: true })
        } catch (error) {
            ctx.throw(500, 'Nodemailer ERROR: ' + error.message);
        }
    }
}));
