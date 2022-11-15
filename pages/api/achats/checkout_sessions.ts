const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res:any) {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.

            const article = req.body
            const session = await stripe.checkout.sessions.create({
                line_items: [{
                    price_data: {
                        currency: 'eur',
                        unit_amount: 1000,
                        product_data: {
                            name: 'test',
                            description: 'test',
                        },
                    },
                    quantity:1,
                }],
                mode: 'payment',
                success_url: `${req.headers.origin}`,
                cancel_url: `${req.headers.origin}`,

            });


            res.status(200).redirect(session.url);
        } catch (err: any) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
