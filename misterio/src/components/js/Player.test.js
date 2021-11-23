import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Player from './Player.js';

test('render player', () => {
  const component = render(<Player color="green"/>)
});
