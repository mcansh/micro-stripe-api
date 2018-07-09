import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export const findCustomer = async ({ email }) => {
  try {
    const customer = await stripe.customers.list({ email });

    return customer.data[0];
  } catch (error) {
    const message = {
      message: 'An error occured looking up that customer',
      error: error.stack,
    };

    return message;
  }
};

export const createCustomer = async ({ email, name }) => {
  try {
    const customer = await stripe.customers.create({
      email,
      metadata: { name },
    });

    console.log(`Created customer for ${email}`);

    return customer;
  } catch (error) {
    const message = {
      message: `An error occured creating a customer for ${email}`,
      error: error.stack,
    };

    return message;
  }
};

const findOrCreateCustomer = async req => {
  const customer = await findCustomer(req);

  if (customer) {
    console.log(`Found customer for ${customer.email}`);
    return customer;
  }
  return createCustomer(req);
};

export default findOrCreateCustomer;
