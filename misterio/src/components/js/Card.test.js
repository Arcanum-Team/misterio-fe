import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card.js';

test('render card', () => {
  const component = render(<Card cardName= "Panteon"/>)
  component.getByText("Panteon")
});
