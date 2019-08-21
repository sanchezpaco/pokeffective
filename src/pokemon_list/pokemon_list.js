import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const pokemons = require('./pokemon_list.json') 

const getPokemonInfo = (pokemonName) => {
  return pokemons.filter((pokemon) => { 
    return pokemon.key === pokemonName; 
  })[0]
}

class PokemonList extends React.Component {
  savePokemon(event, data) {
    this.props.savePokemon(getPokemonInfo(data.value))
  }

  render() {
    return(
      <Dropdown
        placeholder='Select Pokemon'
        fluid
        search
        selection
        defaultValue={pokemons[0].key}
        onChange={(event, data) => this.savePokemon(event, data)}
        options={pokemons}
      />
    )
  }
}

export default PokemonList 