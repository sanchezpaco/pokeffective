import React from 'react';
import ReactDOM from 'react-dom';
import TypeChartMain from './type_chart_main';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TypeChartMain />, div);
  ReactDOM.unmountComponentAtNode(div);
});
