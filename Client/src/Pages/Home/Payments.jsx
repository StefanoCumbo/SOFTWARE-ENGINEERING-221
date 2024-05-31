import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('test_publishable_key'); 

const HOURLY_RATE = 250; 

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const calculateParkingFee = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationInHours = (endDate - startDate) / (1000 * 60 * 60);

    if (durationInHours <= 0) {
      throw new Error("End time must be after start time");
    }

    return Math.ceil(durationInHours) * HOURLY_RATE;
  };

  useEffect(() => {
    if (startTime && endTime) {
      try {
        const calculatedPrice = calculateParkingFee(startTime, endTime);
        setPrice(calculatedPrice);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPrice(null);
      }
    }
  }, [startTime, endTime]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    let amount = price;

    if (amount <= 0) {
      setError("Invalid parking duration");
      return;
    }

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: name,
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      setSuccess(true);
      setProcessing(false);
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="start-time">Start Time</label>
        <input
          type="datetime-local"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="end-time">End Time</label>
        <input
          type="datetime-local"
          id="end-time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="card-element">Card Details</label>
        <CardElement id="card-element" />
      </div>
      {price !== null && !error && (
        <div className="price">
          <p>Total Price: ${(price / 100).toFixed(2)}</p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Payment successful!</div>}
      <button type="submit" disabled={!stripe || processing} className="btn btn-primary">
        Pay
      </button>
    </form>
  );
};

const Payments = () => {
  return (
    <div className="payment-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payments;