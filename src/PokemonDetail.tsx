import React from 'react';
import ApiClient from './api/client';
import endpoints from './api/endpoints';
import { useState } from 'react';

export default function PokemonDetail() {
  type pokemonDetailType = {
    name?: string;
    height?: number;
    weight?: number;
    sprites?: Sprites;
    baseExperience?: number;
    game_indices?: GameIndices;
    types?: Types;
  }

  type Sprites = {
    front_default: string
  }

  type Types = {
    type: {
      name: string
    }
  }

  type GameIndices = {
    version: {
      name: string
    }
  }

  const [pokemonDetail, setPokemonDetail] = useState<pokemonDetailType>({});
  const [number, setNumber] = useState<string>('1');

  function getPokemon() {
    const client: ApiClient = new ApiClient();
    const PokemonUrl: string = endpoints.POKEMON;
    const pokemonId = number
    const endpoint = PokemonUrl + '/' + pokemonId;
    client.get(endpoint).then(result => {

      setPokemonDetail({
        name: result.name,
        height: result.height,
        weight: result.weight,
        baseExperience: result.base_experience,
        game_indices: result.game_indices,
        types: result.types,
        sprites: result.sprites
      });
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <div>
      <input type="text" placeholder='please input pokemon number'
             onChange={(event) => setNumber(event.target.value)}
             style={{ marginBottom: '10px', width: '200px' }}/>
      <br />
      <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={getPokemon}>Get</button>
      <div>
        {pokemonDetail?.sprites?.front_default &&
          <figure>
            <img src={pokemonDetail?.sprites?.front_default as string} alt="pokemon img" />
          </figure>
        }
        <p>名前: {pokemonDetail.name}</p>
        <p>身長: {pokemonDetail.height}</p>
        <p>体重: {pokemonDetail.weight}</p>
        <p>経験値: {pokemonDetail.baseExperience}</p>
        <p>タイプ: {pokemonDetail.types?.map((type) => type.type.name).join(', ')}</p>
        <p>登場ゲーム: {pokemonDetail.game_indices?.map((game) => game.version.name).join(', ')}</p>
      </div>
    </div>
  )
}
