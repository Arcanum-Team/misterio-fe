import { render } from '@testing-library/react';
import ListGames from './ListGames.js';

test('render list games',() => {
  const component = render(<ListGames />);
  component.getByText("Listar Partidas")
});