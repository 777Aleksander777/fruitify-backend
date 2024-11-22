/**
 * payment controller
 */

import Stripe from 'stripe';
import { factories } from '@strapi/strapi'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-10-28.acacia',
})

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({

    async intent(ctx) {

        try {
            const { price } = ctx.request.body;

            const payment = await stripe.paymentIntents.create({
                amount: price*100,
                currency: 'PLN',
                payment_method_types: [
                    'blik',
                ],
            });

            ctx.send({ clientSecret: payment.client_secret })
        } catch (error) {
            ctx.throw(500, 'Stripe ERROR: ' + error.message);
        }
    },
}));