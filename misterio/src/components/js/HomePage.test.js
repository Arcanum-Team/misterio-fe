import React from "react";
import { render } from '@testing-library/react';
import HomePage from './HomePage.js';

test('render homepage', () => {
  const component = render(<HomePage />)
  component.getByText("Crear Partida")
  component.getByText("Listar Partidas")
});
