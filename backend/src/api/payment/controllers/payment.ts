/**
 * payment controller
 */

import Stripe from 'stripe';
import { factories } from '@strapi/strapi'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia',
})

export default factories.createCoreController('api::payment.payment', ({ strapi }) => ({

    async intent(ctx) {

        try {
            const { price, items, phone, email } = ctx.request.body;

            console.log("Backend email: " + email);
            console.log("################################3";
            console.log("Backend email type: " + typeof(email));

            const productsMetadata = JSON.stringify(
                items.map((item: { name: string; price: number; quantity: number }) => ({
                    nazwa: item.name,
                    ilosc: item.quantity,
                    cena: item.price,
                }))
              );

            const payment = await stripe.paymentIntents.create({
                amount: Math.round(price*100),
                currency: 'PLN',
                payment_method_types: [
                    'blik',
                ],
                metadata: {
                    products: productsMetadata,
                    telefon: JSON.stringify(phone)
                },
                receipt_email: String(email)
            });

            ctx.send({ clientSecret: payment.client_secret })
        } catch (error) {
            ctx.throw(500, 'Stripe ERROR: ' + error.message);
        }
    },
}));
