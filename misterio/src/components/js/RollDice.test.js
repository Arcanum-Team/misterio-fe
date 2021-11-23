import { render } from '@testing-library/react';
import RollDice from './RollDice.js';

test('render roll dice',() => {
  const component = render(<RollDice/>);
  component.getByText("Tirar dado")
});