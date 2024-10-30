import React from 'react';
import './Estrenos.css'; // Importa el archivo CSS

function Estrenos() {
  return (
    <div className="estrenos-container">
      <h1>Estrenos de la próxima semana</h1>
      <div className="estrenos-grid">
        {/* Crea una tarjeta para cada película */}
        <div className="estrenos-card">
          <img src="./imagenes/Silencio.jpg" alt="Un lugar en silencio" />
          <h3>Un lugar en silencio</h3>
        </div>
        <div className="estrenos-card">
          <img src="./imagenes/Crow.jpg" alt="The Crow" />
          <h3>The Crow</h3>
        </div>
        <div className="estrenos-card">
          <img src="/imagenes/Trampa.jpg" alt="La trampa" />
          <h3>La trampa</h3>
        </div>
        {/* Agrega más tarjetas para las otras películas */}
      </div>
    </div>
  );
}

export default Estrenos;