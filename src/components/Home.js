import React, { useState } from 'react';
import './Home.css';
import Hoy from './Hoy';
import Estrenos from './Estrenos';
import Proximamente from './Proximamente';
import Payment from './Payment';
import ModalTicketComida from './ModalTicketComida';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q9Do1FSdCYLRGcqP8DwPwAko1nQNIwXur3Ck9lPmdoJFqdtga9Vji58QIccWKa9HJY9H6leW0ADl2N5QwcmIznv00QvlJJy9h');

function Home() {
    const [selectedTab, setSelectedTab] = useState('hoy');
    const [showPayment, setShowPayment] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [ticketData, setTicketData] = useState(null);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const handlePaymentClick = (amount, promocion) => {
        setPaymentAmount(amount);
        setShowPayment(true);
        setTicketData({ // Guardamos solo los datos iniciales del ticket, sin mostrarlo
            promocion,
            amount,
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
        });
    };

    const handlePaymentSuccess = () => {
        setShowPayment(false); // Cerramos el modal de pago
        // Ahora mostramos el ticket de comida después de que el pago sea exitoso
        setTicketData((prevData) => ({
            ...prevData,
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
        }));
    };

    return (
        <div className="home-container">
            <button className="logout-button">Cerrar Sesión</button>
            <img src="/imagenes/Logo.png" alt="Logo Cinepolis 2" style={{ width: '300px', height: 'auto' }} />

            <div className="menu">
                <button onClick={() => handleTabChange('hoy')} className={selectedTab === 'hoy' ? 'active' : ''}>Hoy</button>
                <button onClick={() => handleTabChange('estrenos')} className={selectedTab === 'estrenos' ? 'active' : ''}>Estrenos</button>
                <button onClick={() => handleTabChange('proximamente')} className={selectedTab === 'proximamente' ? 'active' : ''}>Próximamente</button>
                <button onClick={() => handleTabChange('reportes')} className={selectedTab === 'reportes' ? 'active' : ''}>Reportes</button>
            </div>

            <div className="content-box">
                {selectedTab === 'hoy' && <Hoy />}
                {selectedTab === 'estrenos' && <Estrenos />}
                {selectedTab === 'proximamente' && <Proximamente />}
            </div>

            <h2 className="promotions-title">Promociones</h2>
            <div className="promotions">
                <div className="promotion">
                    <img src="/imagenes/Foto_P1.jpg" alt="Promoción 1" />
                    <h3>Promoción 1</h3>
                    <p>Dos entradas matutinas con 2 hamburguesas y soda por Q.150.00</p>
                    <button onClick={() => handlePaymentClick(150.00, "Promoción 1")}>Pagar</button>
                </div>
                <div className="promotion">
                    <img src="/imagenes/Foto_P2.jpg" alt="Promoción 2" />
                    <h3>Promoción 2</h3>
                    <p>Una entrada nocturna con porción de nachos extra queso y helado por Q.99.00</p>
                    <button onClick={() => handlePaymentClick(99.00, "Promoción 2")}>Pagar</button>
                </div>
                <div className="promotion">
                    <img src="/imagenes/Foto_P3.jpg" alt="Promoción 3" />
                    <h3>Promoción 3</h3>
                    <p>3 Hamburguesas y 2 sodas por Q.145.00</p>
                    <button onClick={() => handlePaymentClick(145.00, "Promoción 3")}>Pagar</button>
                </div>
            </div>

            {showPayment && (
                <Elements stripe={stripePromise}>
                    <Payment
                        amount={paymentAmount}
                        onSuccess={handlePaymentSuccess}
                        onClose={() => setShowPayment(false)}
                    />
                </Elements>
            )}

            {ticketData && !showPayment && (
                <ModalTicketComida
                    promocion={ticketData.promocion}
                    monto={ticketData.amount}
                    fecha={ticketData.fecha}
                    hora={ticketData.hora}
                    onClose={() => setTicketData(null)}
                />
            )}
        </div>
    );
}

export default Home;
