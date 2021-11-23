import { render, screen } from '@testing-library/react';
import StartGame from './StartGame.js';
import Portal from './Portal.js'

test('render start game button',() => {
  const portal = render(<Portal/>);
  const component = render(<StartGame/>);
  component.getByText("Iniciar Partida");
});