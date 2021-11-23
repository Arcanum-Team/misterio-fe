import { render, screen } from '@testing-library/react';
import JoinGame from './JoinGame.js';


test('render join game button', async () => {
  const component = render(<JoinGame/>);
  component.getByText("Unirse a Partida")
});