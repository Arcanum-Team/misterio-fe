import { render, screen } from '@testing-library/react';
import StartGame from './StartGame.js';
import Portal from './Portal.js'

test('start game',() => {
  const portal = render(<Portal/>);
  const component = render(<StartGame/>);
  component.getByText("Iniciar Partida");
});