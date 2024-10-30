import React from 'react';
import './Proximamente.css';

function Proximamente() {
    return (
        <div className="proximamente-container">
            <h2 className="titulo-pelicula">El Juego del Calamar 2</h2>
            <div className="video-container">
                <video width="100%" controls>
                    <source src="/videos/JuegoCalamar2.mp4" type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                </video>
            </div>
            <p className="sinopsis">
                <strong>Sinopsis:</strong> En esta temporada, el jugador 456 (Gi-hun) regresa con el objetivo de vengarse y hacer pagar a los creadores del juego. Gi-hun se sumerge de nuevo en el juego de supervivencia, compitiendo por un premio de 45,600 millones de wones.
            </p>
            <p className="fecha-estreno">Fecha de estreno: 26 de diciembre de 2024</p>
        </div>
    );
}

export default Proximamente;
