import { render, requestOptions, setErrorMessage } from '@testing-library/react';
import ListOfGames from './ListOfGames.js';

test('render list of games', () => {
  const component = render(<ListOfGames />);
  component.getByText("No hay partidas");
});


