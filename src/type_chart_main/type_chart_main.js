import React from 'react';
import calculateEffectiveness from "../calculator/calculator"
import PokemonList from "../pokemon_list/pokemon_list"
import AttackTypesList from '../attack_types_list/attack_types_list';
import CalculatorButton from '../calculator/calculator_button';

class TypeChartMain extends React.Component {
  async saveAttack(newAttack) {
    await this.setState({attack: newAttack}) 
  }

  async savePokemon(newPokemon) {
    await this.setState({pokemon: newPokemon}) 
  }

  calculate() {
    const attack = this.state.attack.key.toLowerCase() 
    const pokemonType = this.state.pokemon.pokemon_type
    alert(calculateEffectiveness(attack, pokemonType))
  }

  render() {
    return(
      <div className="TypeChartMain">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <AttackTypesList saveAttack={(attack) => this.saveAttack(attack)}/>
        <PokemonList savePokemon={(pokemon) => this.savePokemon(pokemon)}/>
        <CalculatorButton calculate={() => this.calculate()}/>
      </div>
    )
  }
}

export default TypeChartMain;