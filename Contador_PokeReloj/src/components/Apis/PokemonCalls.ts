import { useEffect, useState } from "react";

interface PokemonListResult{
    name: string;
    url: string;
}

export const usePokemon = () =>{
    const [listaPokemon, setListaPokemon] = useState<PokemonListResult[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        const fetchPokemon = async () =>{
            try{
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300');
                const data = await response.json();
                setListaPokemon(data.results);
            } catch(error){
                console.error("Error al cargar la API", error);
            } finally{
                setCargando(false)
            }
        };
        fetchPokemon();
    }, []);
    return {listaPokemon, cargando};
}