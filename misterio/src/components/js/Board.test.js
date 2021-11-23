import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Board from './Board.js';

test('render board', () => {
  const component = render(<Board/>)
});
