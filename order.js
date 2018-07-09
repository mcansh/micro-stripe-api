import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

const createOrder = async ({ currency, email, items, shipping }) => {
  try {
    const order = await stripe.orders.create({
      currency,
      email,
      items: items.map(item => ({
        type: 'sku',
        parent: item.sku,
        quantity: item.quantity,
      })),
      shipping,
    });

    return order;
  } catch (error) {
    const message = {
      message: `An error occured creating an order for ${email}`,
      error: error.stack,
    };

    return message;
  }
};

export default createOrder;
