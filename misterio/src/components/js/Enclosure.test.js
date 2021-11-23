import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Enclosure from './Enclosure.js';

test('render enclosure', () => {
  const component = render(<Enclosure value="Bilbioteca"/>)
  component.getByText("Bilbioteca")
});
