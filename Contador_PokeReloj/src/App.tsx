import { useState } from 'react';
import { usePokemon } from './components/Apis/PokemonCalls';
import './Contador.css';

import NavBar from './components/Navbar';

import fondoCuadro from './assets/Boton.svg';
import fondoCuadroAnimation from './assets/Boton animacion.svg';
import Pantalla from './assets/Pantalla.svg';
import Minus from './assets/Decremento.svg';
import Plus from './assets/Incremento.svg';
import resetbtn from './assets/Reset.svg'
import resetAnim from './assets/ResetAnim.svg'
import ShinyBtn from './assets/Shiny.svg'
import ShinyBtnAnim from './assets/ShinyAnim.svg'


const Contador = () => {
  const [contar, setContar] = useState<number>(0);

  const {listaPokemon, cargando} = usePokemon(); 
  
  const [animBtnMas, setAnimBtnMas] = useState(false);
  const [animBtnMenos, setAnimBtnMenos] = useState(false);
  const [AnimBtnReset, setAnimBtnReset] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const PokemonFilter = listaPokemon
    .filter(pokemon =>
      !pokemon.name.includes("-mega") &&
      !pokemon.name.includes("-gmax") &&
      !pokemon.name.includes("-starter") &&
      !pokemon.name.includes("-totem")
    )
    .filter(pokemon=>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  const [AnimBtnShiny, setAnimBtnShiny] = useState(false);

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

  const shiny = () =>{
    setAnimBtnShiny(true);
    setContar(0);
    setTimeout(()=> setAnimBtnShiny(false),200)
  }

  return (
    <div className="contenedor">
      <div className='navBar'>
      <NavBar />
      </div>

      <div className='Search'>
        <input type="text" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder={cargando ? 'Cargando Pokédex...' : 'Buscar Pokémon...'}/>
      
      {searchValue.length > 1&&(
        <ul className='resultados-busqueda'>
          {PokemonFilter.slice(0,5).map(poke=>{
            const id = poke.url.split("/")[6];
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            return(
              <li key={poke.name} onClick={()=> setSearchValue(poke.name)}>
                <img src={sprite} width={80} />
                {poke.name}
              </li>
            )
          })}
        </ul>
      )}
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

          <button onClick={shiny}
            className='btn-sh'
            >
            <img 
            src={AnimBtnShiny ? ShinyBtnAnim : ShinyBtn} 
            alt="" />
          </button>

          <button onClick={reset}
          className='btn-rs'
          >
            <img
            src={AnimBtnReset ? resetAnim : resetbtn }
            alt='Reset'
            className=' icono-reset'
            />
            <>
          </>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contador;