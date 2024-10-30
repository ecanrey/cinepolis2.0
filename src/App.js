import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';  // Importa el componente Login
import Home from './components/Home';    // Importa el componente Home
import Payment from './components/Payment'; // Importa el componente Payment
import './App.css'; // Importa los estilos

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Carga tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51Q9Do1FSdCYLRGcqP8DwPwAko1nQNIwXur3Ck9lPmdoJFqdtga9Vji58QIccWKa9HJY9H6leW0ADl2N5QwcmIznv00QvlJJy9h');

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Ruta para el login */}
            <Route path="/" element={<Login />} />
            
            {/* Ruta para la página de inicio (home) */}
            <Route path="/home" element={<Home />} />

            {/* Ruta para el componente de pago */}
            <Route path="/payment" element={
              <Elements stripe={stripePromise}>
                <Payment amount={1000} onClose={() => { /* Cierra tu modal aquí */ }} />
              </Elements>
            } />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
