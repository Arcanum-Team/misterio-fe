import { render, screen } from '@testing-library/react';
import CreateGame from './CreateGame.js';


test('render create game button', async () => {
  const component = render(<CreateGame/>);
  component.getByText("Crear Partida")
});