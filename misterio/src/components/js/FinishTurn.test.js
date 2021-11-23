import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FinishTurn from './FinishTurn.js';

test('render finish turn button', () => {
  const component = render(<FinishTurn />)
  component.getByText("Terminar Turno")
});
