import { send, json } from 'micro';
import { router, post, get } from 'microrouter';
import microCors from 'micro-cors';
import { order, charge } from './payment';

const cors = microCors();

const postCharge = async (req, res) => {
  try {
    const request = await json(req);
    const response = await charge(request);
    send(res, 200, response);
  } catch (error) {
    console.log('An error has occured during payment', error.stack);
    send(res, error.statusCode, error.message);
  }
};

const postOrder = async (req, res) => {
  try {
    const request = await json(req);
    const response = await order(request);
    send(res, 200, response);
  } catch (error) {
    console.log('An error has occured during payment', error.stack);
    send(res, error.statusCode, error.message);
  }
};

const notfound = (req, res) =>
  send(res, 404, `Could not find route ${req.method} ${req.url}`);

const app = cors(
  router(
    post('/payments/charge', postCharge),
    post('/payments/order', postOrder),
    get('*', notfound),
    post('*', notfound)
  )
);

export default app;
