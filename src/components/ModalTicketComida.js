// src/components/ModalTicketComida.js
import React from 'react';
import './ModalTicket.css';

function ModalTicketComida({ promocion, monto, fecha, hora, onClose }) {
    const ticketNumber = new Date().toISOString().replace(/\D/g, '').slice(0, 12);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Ticket de Compra de Promoción</h2>
                <p><strong>Promoción:</strong></p>
                <p>{promocion}</p>
                <p><strong>Monto Pagado:</strong></p>
                <p>Q{monto.toFixed(2)}</p>
                <p><strong>Número de Ticket:</strong></p>
                <p>{ticketNumber}</p>
                <p><strong>Fecha:</strong></p>
                <p>{fecha}</p>
                <p><strong>Hora:</strong></p>
                <p>{hora}</p>
                <button onClick={handlePrint}>Imprimir Ticket</button>
                <p></p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default ModalTicketComida;
