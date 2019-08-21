import React from 'react';
import ReactDOM from 'react-dom';
import PokemonList from './pokemon_list';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PokemonList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
