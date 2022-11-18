const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: `${req.query.priceCode}`,
                        quantity: 1 // prix de votre produit / commande// devise
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/boiteaoutils/outilsnumeriques?success=true`,
                cancel_url: `${req.headers.origin}/boiteaoutils/outilsnumeriques`,
            });
            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
