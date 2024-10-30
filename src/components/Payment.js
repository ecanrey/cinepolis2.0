// src/components/Payment.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

const Payment = ({ amount, onClose, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const cardElement = elements.getElement(CardElement);

        try {
            // Llamada a tu backend para crear el PaymentIntent
            const response = await fetch('http://localhost:3001/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: Math.round(amount /* * 100 */) }), // Enviar el monto en centavos
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error: ${errorData.error}`);
                return;
            }

            const { clientSecret } = await response.json();

            // Confirmar el pago con Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                setError(stripeError.message);
            } else {
                setSuccess('Pago exitoso');
                if (onSuccess) onSuccess(paymentIntent); // Llamar a onSuccess si el pago es exitoso
                onClose(); // Cerrar el modal al completar el proceso
            }
        } catch (err) {
            setError('Ocurrió un error al procesar el pago');
            console.error(err);
        }
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <p>Monto a Pagar</p>
                <h2>Q{amount.toFixed(2)}</h2>
                <CardElement className="card-element" />
                <button type="submit" disabled={!stripe || !elements}>Pagar</button>
                <button type="button" onClick={onClose}>Cerrar</button>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
            </form>
        </div>
    );
};

export default Payment;
