import ApiClient from './api/client';
import endpoints from './api/endpoints';
import { useState, useEffect } from 'react';
import PokemonThumbnail from './PokemonThumbnail';

export default function PokemonList() {
  type PokemonType = {
    name: string,
    id: string
  }

  const [pokemonList, setPokemonList] = useState<PokemonType[]>([]);

  // ページ表示時に、ポケモンの一覧を取得するa
  function getPokemonList() {
    const client: ApiClient = new ApiClient();
    const PokemonUrl: string = endpoints.POKEMON;
    const endpoint = PokemonUrl;
    client.get(endpoint).then(result => {
      const formattedPokemonList: PokemonType[] = []
      result.results.forEach((pokemon: {name: string, url: string}) => {
        const id = pokemon.url.split('/').filter((v: string) => v !== '').pop();
        formattedPokemonList.push({
          name: pokemon.name,
          id: id,
          url: pokemon.url
        });
      });
      setPokemonList(formattedPokemonList);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <>
      {pokemonList.map((pokemon, index) => {
        return <PokemonThumbnail key={index} id={pokemon.id} name={pokemon.name} />
      })}
    </>
  )
}
