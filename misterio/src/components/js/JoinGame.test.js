import { render, screen } from '@testing-library/react';
import JoinGame from './JoinGame.js';


test('join game', async () => {
  const component = render(<JoinGame/>);
  component.getByText("Unirse a Partida")
});