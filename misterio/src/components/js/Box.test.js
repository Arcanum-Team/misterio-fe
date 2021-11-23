import React from "react";
import { render } from '@testing-library/react';
import Box from './Box.js';

test('render box', () => {
  const component = render(<Box/>)
});
