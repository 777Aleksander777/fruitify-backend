/**
 * contact router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::contact.contact');

export default {
    routes: [
        {
            method: 'POST',
            path: '/contact/sendMail',
            handler: 'contact.sendMail',
            config: {
                policies: [],
                middlewares: [],
            }
        }
    ]
}
