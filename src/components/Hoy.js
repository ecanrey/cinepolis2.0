// src/components/Hoy.js
import React, { useState } from 'react';
import './Hoy.css';
import Payment from './Payment';
import ModalTicket from './ModalTicket';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'; // Importar axios

const stripePromise = loadStripe('pk_test_51Q9Do1FSdCYLRGcqP8DwPwAko1nQNIwXur3Ck9lPmdoJFqdtga9Vji58QIccWKa9HJY9H6leW0ADl2N5QwcmIznv00QvlJJy9h');

function Hoy() {
    const peliculas = [
        {
            id: 1,
            titulo: 'Iron Man 3',
            descripcion: 'El descarado y brillante Tony Stark, tras ver destruido todo su universo personal...',
            precio: 'Q.35.00',
            horarios: ['14:00', '16:30', '19:00'],
            imagen: '/imagenes/ironman3.jpg',
        },
        {
            id: 2,
            titulo: 'Trolls',
            descripcion: 'Es una película estadounidense para todo público de comedia y musical...',
            precio: 'Q.45.00',
            horarios: ['13:00', '15:30', '18:00'],
            imagen: '/imagenes/Trolls.jpg',
        },
    ];

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showSeatsModal, setShowSeatsModal] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSelectSeats = (pelicula) => {
        setSelectedMovie(pelicula);
        setShowSeatsModal(true);
    };

    const toggleSeatSelection = (row, seat) => {
        const seatId = `${row}-${seat}`;
        setSelectedSeats((prevSelected) => {
            if (prevSelected.includes(seatId)) {
                return prevSelected.filter((s) => s !== seatId);
            } else {
                return [...prevSelected, seatId];
            }
        });
    };
    const handleConfirmClick = () => {
        setShowSeatsModal(false);
        setShowPayment(true);
    };

    const handlePaymentSuccess = async () => {
        setShowPayment(false);
        setShowTicketModal(true);
        // Preparar los datos del ticket
        const ticketData = {
            nombre_pelicula: selectedMovie.titulo,
            numero_ticket: Date.now().toString(), // Puedes generar un número de ticket único aquí
            asientos_seleccionados: selectedSeats.join(', '),
            fecha_compra: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
            hora_compra: new Date().toLocaleTimeString(), // Formato HH:mm:ss
        };

        try {
            // Realizar la solicitud POST a la API para guardar el ticket
            console.log("Enviando datos del ticket a la API:", ticketData); // Para verificar datos
            await axios.post('http://localhost:3001/api/tickets', ticketData);

        } catch (error) {
            console.error("Error al guardar el ticket:", error);
            // Manejar el error, mostrar un mensaje al usuario si es necesario
        }
    };

    const totalPrecio = selectedMovie
        ? selectedSeats.length * parseFloat(selectedMovie.precio.replace('Q.', '').replace(',', '.'))
        : 0;

    return (
        <div>
            <div className="peliculas-container">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="pelicula-container">
                        <h2 className="promotions-title">{pelicula.titulo}</h2>
                        <img src={pelicula.imagen} alt={pelicula.titulo} className="pelicula-imagen" />
                        <p>{pelicula.descripcion}</p>
                        <p>Precio: {pelicula.precio}</p>
                        <p>
                            <label>Seleccionar horario:</label>
                            <select>
                                {pelicula.horarios.map((horario, index) => (
                                    <option key={index} value={horario}>
                                        {horario}
                                    </option>
                                ))}
                            </select>
                        </p>
                        <button onClick={() => handleSelectSeats(pelicula)}>Seleccionar Asientos</button>
                    </div>
                ))}
            </div>

            {showSeatsModal && selectedMovie && (
                <div className="seats-modal">
                    <h3>Selecciona tus asientos para {selectedMovie.titulo}</h3>
                    <div className="seats-layout">
                        {[...Array(5)].map((_, rowIndex) => (
                            <div key={rowIndex} className="seat-row">
                                {[...Array(5)].map((_, seatIndex) => {
                                    const seatId = `${rowIndex}-${seatIndex}`;
                                    const isSelected = selectedSeats.includes(seatId);
                                    return (
                                        <div
                                            key={seatIndex}
                                            className={`seat ${isSelected ? 'selected' : ''}`}
                                            onClick={() => toggleSeatSelection(rowIndex, seatIndex)}
                                        >
                                            {isSelected ? '✔️' : '💺'}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <h3>Total a pagar: Q{totalPrecio.toFixed(2)}</h3>
                    <button onClick={handleConfirmClick}>Confirmar</button>
                    <button onClick={() => setShowSeatsModal(false)}>Cerrar</button>
                </div>
            )}

            {showPayment && selectedMovie && (
                <Elements stripe={stripePromise}>
                    <Payment amount={totalPrecio} onSuccess={handlePaymentSuccess} onClose={() => setShowPayment(false)} />
                </Elements>
            )}

            {showTicketModal && selectedMovie && (
                <ModalTicket
                    pelicula={selectedMovie}
                    selectedSeats={selectedSeats}
                    onClose={() => setShowTicketModal(false)}
                />
            )}
        </div>
    );
}

export default Hoy;
