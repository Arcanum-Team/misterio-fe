import { render } from '@testing-library/react';
import LobbyPlayer from './LobbyPlayer.js';

test('render lobby player',() => {
  const component = render(<LobbyPlayer playerName="Arcanum"/>);
  component.getByText("Arcanum")
});