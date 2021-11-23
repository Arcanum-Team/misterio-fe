import { render } from '@testing-library/react';
import ListOfPlayers from './ListOfPlayers.js';

test('render list of players',() => {
  const component = render(<ListOfPlayers players={["a", "b", "c"]}/>);
  component.getByText("Jugadores")
});