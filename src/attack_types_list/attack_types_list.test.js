import React from 'react';
import ReactDOM from 'react-dom';
import AttackTypesList from './attack_types_list';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AttackTypesList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
