// src/components/ModalTicket.js
import React from 'react';
import './ModalTicket.css';

function ModalTicket({ pelicula, selectedSeats, onClose }) {
    const ticketNumber = new Date().toISOString().replace(/\D/g, '').slice(0, 12); // Genera el número de ticket en formato DDMMYYYYHHMM
    const fechaActual = new Date().toLocaleDateString();
    const horaActual = new Date().toLocaleTimeString();

    const handlePrint = () => {
        window.print(); // Llamada a la función de impresión
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Pago Efectuado Satisfactoriamente</h2>
                <p><strong>Nombre de la película:</strong></p>
                <p>{pelicula.titulo}</p>
                <p><strong>Número de ticket:</strong></p>
                <p>{ticketNumber}</p>
                <p><strong>Asientos seleccionados:</strong></p>
                <p>{selectedSeats.join(', ')}</p>
                <p><strong>Fecha de Compra:</strong></p>
                <p>{fechaActual}</p>
                <p><strong>Hora:</strong></p>
                <p>{horaActual}</p>
                <button onClick={handlePrint}>Imprimir Ticket</button>
                <p></p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default ModalTicket;