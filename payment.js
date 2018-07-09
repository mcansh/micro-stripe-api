import stripePackage from 'stripe';
import findOrCreateCustomer from './customer';
import createOrder from './order';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

stripe.setTimeout(20000);

const createCharge = async (req, customer) => {
  const { amount, currency = 'usd', source, description } = req;
  try {
    const payment = await stripe.charges.create({
      amount: amount * 100,
      currency,
      source,
      description,
    });

    return payment;
  } catch (error) {
    const message = {
      message: `payment failed for ${customer.email} $${amount * 100}`,
      error: error.stack,
    };

    return message;
  }
};

export const charge = async req => {
  const customer = await findOrCreateCustomer(req);
  return createCharge(req, customer);
};

export const order = async req => createOrder(req);
