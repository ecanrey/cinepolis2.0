// src/components/SeatSelection.js
import React, { useState } from 'react';
import './SeatSelection.css';

function SeatSelection({ onClose, onProceedToPayment }) {
    const seatPrice = 35;
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Simula una lista de asientos (10 asientos en total)
    const seats = Array.from({ length: 10 }, (_, index) => index + 1);

    const toggleSeat = (seat) => {
        setSelectedSeats((prevSeats) =>
            prevSeats.includes(seat)
                ? prevSeats.filter((s) => s !== seat)
                : [...prevSeats, seat]
        );
    };

    const handleProceed = () => {
        const totalAmount = selectedSeats.length * seatPrice;
        onProceedToPayment(totalAmount); // Pasa el monto total al componente de pago
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Selecciona tus Asientos</h3>
                <div className="seats">
                    {seats.map((seat) => (
                        <button
                            key={seat}
                            className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                            onClick={() => toggleSeat(seat)}
                        >
                            {seat}
                        </button>
                    ))}
                </div>
                <p>Total: Q{selectedSeats.length * seatPrice}</p>
                <button onClick={handleProceed}>Proceder a Pagar</button>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default SeatSelection;
