import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(process.env.STRIPE_PK);

export const bookTour = async (tourId) => {
  try {
    const response = await axios(`/api/v2/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: response.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
