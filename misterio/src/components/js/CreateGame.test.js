import { render, screen } from '@testing-library/react';
import CreateGame from './CreateGame.js';


test('create game', async () => {
  const component = render(<CreateGame/>);
  component.getByText("Crear Partida")
});