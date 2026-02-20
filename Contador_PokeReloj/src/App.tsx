import React, { useState, useEffect } from 'react';
import './Contador.css';

import fondoCuadro from './assets/Boton.svg';
import fondoCuadroAnimation from './assets/Boton animacion.svg';
import Pantalla from './assets/Pantalla.svg';
import Minus from './assets/Decremento.svg';
import Plus from './assets/Incremento.svg';
import resetbtn from './assets/Reset.svg'
import resetAnim from './assets/ResetAnim.svg'

interface Registro {
  id: number;
  nombre: string;
  valor: number;
  hora: string;
}

const Contador = () => {
  const [contar, setContar] = useState<number>(0);
  const [nombre, setNombre] = useState<string>('');
  
  const [animBtnMas, setAnimBtnMas] = useState(false);
  const [animBtnMenos, setAnimBtnMenos] = useState(false);
  const [AnimBtnReset, setAnimBtnReset] = useState(false);

  const [historial, setHistorial] = useState<Registro[]>(() => {
    const guardado = localStorage.getItem('historialContador');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('historialContador', JSON.stringify(historial));
  }, [historial]);

  const incrementar = () => {
    setContar(contar + 1);
    setAnimBtnMas(true);
    setTimeout(() => setAnimBtnMas(false), 200);
  };

  const decrementar = () => {
    setContar(Math.max(0, contar - 1));
    setAnimBtnMenos(true);
    setTimeout(() => setAnimBtnMenos(false), 200);
  };

  const reset = () => {
    setContar(0)
    setAnimBtnReset(true);
    setTimeout(()=> setAnimBtnReset(false), 200)
  };

  const agregarRegistro = () => {
    if (nombre.trim() === '') return;
    const nuevoRegistro: Registro = {
      id: Date.now(),
      nombre: nombre,
      valor: contar,
      hora: new Date().toLocaleTimeString(),
    };
    setHistorial([nuevoRegistro, ...historial]);
    setNombre('');
    setContar(0);
  }

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  }

  return (
    <div className="contenedor">

      <div className="guardado">
        <input 
          type="text" 
          placeholder='Nombre...' 
          value={nombre} 
          onChange={handleNombreChange} 
          className="input" 
        />
        <button onClick={agregarRegistro} className="btn-guardar"> 
          Guardar 
        </button>
      </div>

      <div className="lista-contenedor">
        <div className="pantalla">
          <img 
            src={Pantalla} 
            alt="Pantalla de fondo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} 
          />
          <h1 className="numero">
              {contar.toString().padStart(5, '0')}
          </h1>
        </div>

        <div className="controles">
          <button onClick={decrementar} 
            className="btn-pr"
            style={{ transform: animBtnMenos ? 'scale(0.9)' : 'scale(1)' }}
          >
            <img 
              src={animBtnMenos ? fondoCuadroAnimation : fondoCuadro} 
              alt="Cuadro" 
              style={{ width: '100%', height: '100%' }} 
            />
            <img src={Minus} alt="Menos" className="icono" />
          </button>

          <button onClick={incrementar} 
            className="btn-pr"
            style={{ transform: animBtnMas ? 'scale(0.9)' : 'scale(1)' }}
          >
            <img 
              src={animBtnMas ? fondoCuadroAnimation : fondoCuadro} 
              alt="Cuadro" 
              style={{ width: '100%', height: '100%' }} 
            />
            <img src={Plus} alt="Más" className="icono" />
          </button>
                    <button onClick={reset}
          className='btn-rs'
          >
            <img
            src={AnimBtnReset ? resetAnim : resetbtn }
            alt='Reset'
            className=' icono-reset'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contador;