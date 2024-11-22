/**
 * payment router
 */

import middlewares from "../../../../config/middlewares";

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::payment.payment');

export default {
    routes: [
        {
            method: 'POST',
            path: '/payment/intent',
            handler: 'payment.intent',
            config: {
                policies: [],
                middlewares: [],
            }
        }
    ]
}