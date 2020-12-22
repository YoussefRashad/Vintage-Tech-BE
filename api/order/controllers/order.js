'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require('stripe')('sk_test_51HfC2CElpxRPdVDWIiDsnWOUmzLgx6ncjBJSRsJQ1ZoPE089iU2xFDqTc51Ely4FVhs8UlGRMReAFLfiO6mGswxW002xH8loig')

module.exports = {
    create: async (ctx)=>{
        const { name, total, items, stripeTokenID } = ctx.request.body;
        const { id } = ctx.state.user;

        const charge = await stripe.charges.create({
            amount: parseFloat(total * 100),
            currency: "usd",
            source: stripeTokenID,
            description: `Order ${new Date()} by ${ctx.state.user.name}`
        });

        const order = await strapi.services.order.create({
            name,
            total,
            items,
            user: id
        });

        return order
    }
}
