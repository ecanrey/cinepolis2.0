// src/components/Booking.js
import React, { useState } from 'react';
import SeatSelection from './SeatSelection';
import Payment from './Payment';

function Booking() {
    const [showSeatSelection, setShowSeatSelection] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleOpenSeatSelection = () => {
        setShowSeatSelection(true);
    };

    const handleCloseSeatSelection = () => {
        setShowSeatSelection(false);
    };

    const handleProceedToPayment = (amount) => {
        setTotalAmount(amount);
        setShowSeatSelection(false);
        setShowPayment(true);
    };

    const handleClosePayment = () => {
        setShowPayment(false);
    };

    return (
        <div>
            <button onClick={handleOpenSeatSelection}>Seleccionar Asiento</button>

            {showSeatSelection && (
                <SeatSelection
                    onClose={handleCloseSeatSelection}
                    onProceedToPayment={handleProceedToPayment}
                />
            )}

            {showPayment && <Payment totalAmount={totalAmount} onClose={handleClosePayment} />}
        </div>
    );
}

export default Booking;
